import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private readonly fighterRepository:Repository<Fighter>
  ){}

  async create(createFighterDto: CreateFighterDto) {
    const existing = await this.fighterRepository.findOne({
      where: {
        firstName: createFighterDto.firstName,
        lastName: createFighterDto.lastName,
        nickname: createFighterDto.nickname,
      },
    });

    if(existing){
      throw new BadRequestException('El peleador ya se encuentra registrado');
    }

    const fighter = this.fighterRepository.create(createFighterDto);
    return await this.fighterRepository.save(fighter);
  }

  async findAll() {
    return this.fighterRepository.find();
  }

  async findOne(id: number) {
    const fighter = await this.fighterRepository.findOne(
      {
        where: {id}, 
        relations:[
          'bonuses',
          'fightsAsA',
          'fightsAsA.event',//get event of that fight
          'fightsAsB',
          'fightsAsB.event',
          'fightsAsA.fighterA',//get both fighter names of that fight (A & B)
          'fightsAsA.fighterB',
          'fightsAsB.fighterA',
          'fightsAsB.fighterB',
        ]
      }
    );

    if (!fighter) throw new NotFoundException('Peleador no encontrado');
    
    return fighter;
  }

  async update(id: number, updateFighterDto: UpdateFighterDto) {
    const fighter = await this.findOne(id);

    if (!fighter) throw new NotFoundException('Peleador no encontrado');

    Object.assign(fighter, updateFighterDto);
    return this.fighterRepository.save(fighter);
  }

  async remove(id: number): Promise<{ message: string }> {
    const fighter = await this.findOne(id);

    if (!fighter) throw new NotFoundException('Peleador no encontrado');

    await this.fighterRepository.remove(fighter);
    return { message: 'Peleador eliminado correctamente' };
  }
}
