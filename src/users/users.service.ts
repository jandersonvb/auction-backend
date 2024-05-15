import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExisting = await this.userRepository.findOne({ where: { username: createUserDto.username } });

    if (userExisting) {
      throw new ConflictException("User already exists");
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    user.username = updateUserDto.username;
    user.password = await this.hashPassword(updateUserDto.password);

    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    await this.userRepository.remove(user);
  }
}
