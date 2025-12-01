import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bonus } from "./entities/bonuss.entity";
import { Repository } from "typeorm";
import { Fighter } from "src/fighters/entities/fighter.entity";
import { Fight } from "src/fights/entities/fight.entity";
import { CreateBonussDto } from "./dto/create-bonuss.dto";
import { UpdateBonussDto } from "./dto/update-bonuss.dto";
import { Event } from "src/events/entities/event.entity";

@Injectable()
export class BonusesService {
  constructor(
    @InjectRepository(Bonus)
    private bonusRepo: Repository<Bonus>,

    @InjectRepository(Fighter)
    private fightersRepo: Repository<Fighter>,

    @InjectRepository(Fight)
    private fightsRepo: Repository<Fight>,

    @InjectRepository(Event)
    private eventsRepo: Repository<Event>
  ) {}

  async create(createBonusDto: CreateBonussDto) {
    const fighter = await this.fightersRepo.findOne({ where: { id: createBonusDto.fighterId } });
    const fight = await this.fightsRepo.findOne({ where: { id: createBonusDto.fightId } });
    const event = await this.eventsRepo.findOne({ where: { id: createBonusDto.eventId } });

    if (!fighter) throw new NotFoundException('Fighter not found');
    if (!fight) throw new NotFoundException('Fight not found');
    if (!event) throw new NotFoundException('Event not found');

    const bonus = this.bonusRepo.create({
      type: createBonusDto.type,
      fighter,
      fight,
      event,
      amount:createBonusDto.amount
    })

    return await this.bonusRepo.save(bonus)
  }

  async findAll() {
    return await this.bonusRepo.find({
      relations: ['fighter', 'fight', 'event'],
    });
  }

  async findOne(id: number) {
    const bonus = await this.bonusRepo.findOne({
      where: { id },
      relations: ['fighter', 'fight', 'event'],
    });
    if (!bonus) throw new NotFoundException('Bonus not found');

    return bonus
  }

  async update(id: number, dto: UpdateBonussDto) {
    const bonus = await this.findOne(id);
    if (!bonus) throw new NotFoundException('Bonus not found');

    Object.assign(bonus, dto);
    return await this.bonusRepo.save(bonus);
  }

  async remove(id: number) {
    const bonus = await this.findOne(id);
    if (!bonus) throw new NotFoundException('Bonus not found');

    return await this.bonusRepo.remove(bonus);
  }
}
