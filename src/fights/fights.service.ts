import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from './entities/fight.entity';
import { Repository } from 'typeorm';
import { Fighter } from 'src/fighters/entities/fighter.entity';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private readonly fightsRepository:Repository<Fight>,
    @InjectRepository(Fighter)
    private readonly fightersRepository:Repository<Fighter>
  ){}

  async create(createFightDto: CreateFightDto) {
    const fighterA = this.fightersRepository.findOneBy({id: createFightDto.fighterAId});
    const fighterB = this.fightersRepository.findOneBy({id: createFightDto.fighterBId});

    if(!fighterA || !fighterB){
      throw new NotFoundException('Uno de los peleadores no fue encontrado');
    }

    if (createFightDto.fighterAId === createFightDto.fighterBId) {
      throw new BadRequestException('Un peleador no puede pelear contra el mismo');
    }

    const existingFight = await this.fightsRepository.findOne({
      where: [ 
        //Avoid add same fight regardless of the order of the fighters, example (Mcgregor vs Khabib) - (Khabib vs Mcgregor).
        { fighterA: { id: createFightDto.fighterAId }, fighterB: { id: createFightDto.fighterBId }, date: new Date(createFightDto.date) },
        { fighterA: { id: createFightDto.fighterBId }, fighterB: { id: createFightDto.fighterAId }, date: new Date(createFightDto.date) },
      ]
    });

    if(existingFight){
      throw new BadRequestException('La pelea ya se encuentra registrada')
    }

    const fight = this.fightsRepository.create({
      fighterA: { id: createFightDto.fighterAId },
      fighterB: { id: createFightDto.fighterBId },
      date: new Date(createFightDto.date),
      result: createFightDto.result,
      method: createFightDto.method,
      rounds: createFightDto.rounds,
    });

    return await this.fightsRepository.save(fight);
  }

  async findAll() {
    return await this.fightsRepository.find({
      relations: ['fighterA', 'fighterB']
    })
  }

  async findOne(id: number) {
    const fight = await this.fightsRepository.findOne({ 
      where: { id },
      relations: ['fighterA', 'fighterB']
    });

    if(!fight){
      throw new BadRequestException('La pelea no existe')
    }

    return fight
  }

  async update(id: number, updateFightDto: UpdateFightDto) {
    const fight = await this.fightsRepository.findOne({where:{id}});

    if (!fight) throw new NotFoundException('Pelea no encontrada');

    const fighterA = await this.fightersRepository.findOneBy({id: updateFightDto.fighterAId});
    const fighterB = await this.fightersRepository.findOneBy({id: updateFightDto.fighterBId});

    if(!fighterA || !fighterB){
      throw new NotFoundException('Uno de los peleadores no fue encontrado');
    }

    const existingFight = await this.fightsRepository.findOne({
      where: [
        { fighterA: { id: updateFightDto.fighterAId }, fighterB: { id: updateFightDto.fighterBId }, date: new Date(updateFightDto.date!) },
        { fighterA: { id: updateFightDto.fighterBId }, fighterB: { id: updateFightDto.fighterAId }, date: new Date(updateFightDto.date!) },
      ],
    });

    if (existingFight && existingFight.id !== fight.id) {
      throw new BadRequestException('Otra pelea se encuentra registrada en esa fecha');
    }

    //update fields
    fight.fighterA = fighterA;
    fight.fighterB = fighterB;
    fight.date = new Date(updateFightDto.date!);
    fight.result = updateFightDto.result!;
    fight.method = updateFightDto.method!;
    fight.rounds = updateFightDto.rounds!;

    return await this.fightsRepository.save(fight);
  }

  async remove(id: number) {
    const fight = await this.fightsRepository.findOne({where:{id}});

    if (!fight) throw new NotFoundException('Pelea no encontrada');

    await this.fightsRepository.remove(fight);
    return { message: 'Pelea eliminada correctamente' };
  }
}
