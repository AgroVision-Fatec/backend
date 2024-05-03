import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    return this.mapToUserResponseDto(user);
  }

  private mapToUserResponseDto(user: User): UserResponseDto {
    return {
      id_usuario: user.id_usuario,
      nome: user.nome,
      telefone: user.telefone,
      email: user.email,
    };
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id_usuario: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id_usuario: id_usuario },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id_usuario} not found`);
    }
    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, userData);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
