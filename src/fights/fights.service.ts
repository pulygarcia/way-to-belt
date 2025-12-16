import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDetailsDto } from './dto/update-fight-details.dto';
import { UpdateFightResultDto } from './dto/update-fight-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fight } from './entities/fight.entity';
import { Repository } from 'typeorm';
import { Fighter } from 'src/fighters/entities/fighter.entity';
import { Event } from 'src/events/entities/event.entity';
import { FightStatus } from 'src/types/fight';
import { FightStats } from 'src/fight-stats/entities/fight-stats.entity';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private readonly fightsRepository:Repository<Fight>,
    @InjectRepository(Fighter)
    private readonly fightersRepository:Repository<Fighter>,
    @InjectRepository(Event)
    private readonly eventRepository:Repository<Event>,
    @InjectRepository(FightStats)
    private readonly fightStatsRepository:Repository<FightStats>
  ){}

  async create(createFightDto: CreateFightDto) {
    const [fighterA, fighterB, event] = await Promise.all([
      this.fightersRepository.findOneBy({id: createFightDto.fighterAId}),
      this.fightersRepository.findOneBy({id: createFightDto.fighterBId}),
      this.eventRepository.findOneBy({id: createFightDto.eventId}),
    ]);

    const isFinalized = createFightDto.winnerId || (createFightDto.stats?.length === 2);

    //assign status based on provided data
    let status: FightStatus;
    if (isFinalized) {
      status = FightStatus.FINALIZED;
    } else {
      //if no results provided, set to scheduled
      status = FightStatus.SCHEDULED;
    }

    if(!fighterA || !fighterB){
      throw new NotFoundException('Uno de los peleadores no fue encontrado');
    }

    //consistency validations
    if (status === FightStatus.FINALIZED) {
      if (!createFightDto.winnerId || !createFightDto.method || !createFightDto.rounds || createFightDto.stats?.length !== 2) {
        throw new BadRequestException('Se requiere ganador, método, round y estadísticas de ambos luchadores para agregar una pelea histórica');
      }

      const winner = await this.fightersRepository.findOneBy({id: createFightDto.winnerId});
      if (!winner || (winner.id !== createFightDto.fighterAId && winner.id !== createFightDto.fighterBId)) {
        throw new BadRequestException('El vencedor no fue encontrado');
      }

      if (winner.id !== fighterA.id && winner.id !== fighterB.id) {
        throw new BadRequestException('El ganador debe ser uno de los participantes de la pelea.');
      }
    }

    if(fighterA.weightClass !== fighterB.weightClass){
      throw new BadRequestException('El peso de los peleadores debe coincidir');
    }

    if (!event) {
      throw new NotFoundException('El evento no fue encontrado');
    }

    if (createFightDto.fighterAId === createFightDto.fighterBId) {
      throw new BadRequestException('Un peleador no puede pelear contra el mismo');
    }

    //avoid same fighter having multiple fights in the same event
    const eventFights = await this.eventRepository.find({
      where: {
        id: createFightDto.eventId
      },
      relations: ['fights','fights.fighterA', 'fights.fighterB'],
    });

    if(eventFights.find(e => e.fights?.some(f => f.fighterA?.id === createFightDto.fighterAId || f.fighterB?.id === createFightDto.fighterAId))){
      throw new BadRequestException(`${fighterA.firstName + ' ' + fighterA.lastName} ya se encuentra en el evento`);
    }
    if(eventFights.find(e => e.fights?.some(f => f.fighterB?.id === createFightDto.fighterBId || f.fighterA?.id === createFightDto.fighterBId))){
      throw new BadRequestException(`${fighterB.firstName + ' ' + fighterB.lastName} ya se encuentra en el evento`);
    }

    const existingFight = await this.fightsRepository.findOne({
      where: [ 
        //Avoid add same fight regardless of the order of the fighters, example (Mcgregor vs Khabib) - (Khabib vs Mcgregor).
        { fighterA: { id: createFightDto.fighterAId }, fighterB: { id: createFightDto.fighterBId }},
        { fighterA: { id: createFightDto.fighterBId }, fighterB: { id: createFightDto.fighterAId }},
      ]
    });

    if(existingFight){
      throw new BadRequestException('La pelea ya se encuentra registrada')
    }

    const fight = this.fightsRepository.create({
      fighterA,
      fighterB,
      event,
      winner: createFightDto.winnerId ? { id: createFightDto.winnerId } as Fighter : undefined, //only set if there is a winner
      method: createFightDto.method,
      rounds: createFightDto.rounds,
      status: createFightDto.status || status,
    });
    //SAVE
    const savedFight = await this.fightsRepository.save(fight);

    //if the fight is finalized, SAVE FIGHT STATS
    if (status === FightStatus.FINALIZED) {
      const fightStatsEntities = createFightDto.stats!.map(statsDto => { 
        //check that the stats belong to fighter from this fight
        if (statsDto.fighterId !== fighterA.id && statsDto.fighterId !== fighterB.id) {
          throw new BadRequestException(`La estadística no pertenece a ninguno de los luchadores de la pelea`);
        }

        return this.fightStatsRepository.create({
          ...statsDto,
          fighter: { id: statsDto.fighterId } as Fighter,
          fight: { id: savedFight.id } as Fight,
        });
      });

      await this.fightStatsRepository.save(fightStatsEntities);
    }

    return savedFight;
  }

  async findAll() {
    return await this.fightsRepository.find({
      relations: ['fighterA', 'fighterB', 'winner', 'event', 'stats', 'stats.fighter']
    })
  }

  async findOne(id: number) {
    const fight = await this.fightsRepository.findOne({ 
      where: { id },
      relations: ['fighterA', 'fighterB', 'winner', 'event', 'stats', 'stats.fighter']
    });

    if(!fight){
      throw new BadRequestException('La pelea no fue encontrada');
    }

    return fight
  }

  async updateDetails(id: number, updateFightDetailsDto: UpdateFightDetailsDto) {
    const fight = await this.fightsRepository.findOne({where:{id}});

    if (!fight) throw new NotFoundException('Pelea no encontrada');

    let fighterA, fighterB;

    if (updateFightDetailsDto.fighterAId) {
      fighterA = await this.fightersRepository.findOneBy({ id: updateFightDetailsDto.fighterAId });
      if (!fighterA) throw new NotFoundException('Peleador A no encontrado');
    }
    if (updateFightDetailsDto.fighterBId) {
      fighterB = await this.fightersRepository.findOneBy({ id: updateFightDetailsDto.fighterBId });
      if (!fighterB) throw new NotFoundException('Peleador B no encontrado');
    }

    //use preload to update only provided fields
    const fightToUpdate = await this.fightsRepository.preload({
      id,
      ...updateFightDetailsDto,
      fighterA: fighterA || fight.fighterA, //retain existing if not provided
      fighterB: fighterB || fight.fighterB,
      event: updateFightDetailsDto.eventId ? { id: updateFightDetailsDto.eventId } : fight.event, //assign event by id if provided, if not, retain existing
    });

    if (!fightToUpdate) {
        // Esto solo debería ocurrir si el ID es nulo, pero ya lo validamos.
        throw new NotFoundException('Error al cargar la pelea para actualizar.'); 
    }

    return await this.fightsRepository.save(fightToUpdate);
  }

  async updateResult(id:number, updateFightResultDto: UpdateFightResultDto) {
    const fight = await this.fightsRepository.findOne(
      {
        where:{id},
        relations: ['fighterA', 'fighterB']
      },
    );

    if (!fight) throw new NotFoundException('Pelea no encontrada');

    if(fight.status === FightStatus.FINALIZED){
      throw new BadRequestException('No se puede actualizar una pelea finalizada');
    }

    //validate winner
    const fighterAId = fight.fighterA.id;
    const fighterBId = fight.fighterB.id;

    if (updateFightResultDto.winnerId !== fighterAId && updateFightResultDto.winnerId !== fighterBId) {
      throw new BadRequestException('El ganador debe ser uno de los participantes de la pelea.');
    }

    if (updateFightResultDto.stats?.length !== 2) {
      throw new BadRequestException('Se requieren los registros de estadísticas de ambos peleadores');
    }

    //update fight
    fight.winner = { id: updateFightResultDto.winnerId } as Fighter;
    fight.method = updateFightResultDto.method;
    fight.rounds = updateFightResultDto.rounds;
    fight.status = FightStatus.FINALIZED;

    const savedFight = await this.fightsRepository.save(fight);

    //save FIGHT STATS
    const fightStatsEntities = updateFightResultDto.stats.map(statsDto => {
      //check that the stats belong to fighter from this fight
      if (statsDto.fighterId !== fighterAId && statsDto.fighterId !== fighterBId) {
        throw new BadRequestException(`La estadística no pertenece a ningun peleador de la pelea`);
      }

      return this.fightStatsRepository.create({
        ...statsDto,
        fighter: { id: statsDto.fighterId } as Fighter,
        fight: { id: savedFight.id } as Fight,
      });
    });

    await this.fightStatsRepository.save(fightStatsEntities);

    //return updated fight with relations
    return await this.fightsRepository.findOne({
      where: { id: savedFight.id },
      relations: ['fighterA', 'fighterB', 'winner', 'event', 'stats', 'stats.fighter']
    });
  }

  async remove(id: number) {
    const fight = await this.fightsRepository.findOne({where:{id}});

    if (!fight) throw new NotFoundException('Pelea no encontrada');

    await this.fightsRepository.remove(fight);
    return { message: 'Pelea eliminada correctamente' };
  }
}
