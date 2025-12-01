import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const exists = await this.eventRepository.findOne(
      {
        where:[
          {name: createEventDto.name},
          {date: new Date(createEventDto.date)}
        ]
      }
    );

    if(exists){
      throw new BadRequestException('El evento ya se encuentra registrado')
    }

    const event = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(event);
  }

  async findAll() {
    return await this.eventRepository.find({relations:['fights']});
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Evento no encontrado');
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Evento no encontrado');

    Object.assign(event, updateEventDto);

    return this.eventRepository.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException('Evento no encontrado');
    
    return this.eventRepository.remove(event);
  }
}

