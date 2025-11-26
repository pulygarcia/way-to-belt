import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (existingUser) {
      throw new BadRequestException('Ya existe un usuario registrado con ese email');
    }

    const user = this.userRepository.create(createUserDto);

    const saltRounds = 10;
    user.password = await bcrypt.hash(createUserDto.password, saltRounds);

    user.role = user.role || 'user';

    return await this.userRepository.save(user);
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  async findAll() {
    return this.userRepository.find();
  }


  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({email});
  }
}
