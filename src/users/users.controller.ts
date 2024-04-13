import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-user.dto';
import { UserDeleteResponseDto } from './dto/response-delete-user.dto';

@ApiTags('usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'O usuário foi criado com sucesso.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de acesso JWT',
    required: true,
    schema: { type: 'string', example: 'Bearer YOUR_JWT_TOKEN_HERE' },
  })
  @ApiResponse({
    status: 200,
    description: 'Operação bem-sucedida',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Operação bem-sucedida',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do usuário',
    type: Number,
  })
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiResponse({
    status: 200,
    description: 'O usuário foi atualizado com sucesso.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do usuário',
    type: Number,
  })
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiResponse({
    status: 200, // Status alterado para 200 se você está retornando conteúdo na resposta.
    description: 'O usuário foi deletado com sucesso.',
    type: UserDeleteResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do usuário',
    type: Number,
  })
  async remove(@Param('id') id: number): Promise<UserDeleteResponseDto> {
    await this.usersService.remove(id);
    return { message: 'Usuário deletado com sucesso.' }; // Retorna a mensagem de sucesso
  }
}
