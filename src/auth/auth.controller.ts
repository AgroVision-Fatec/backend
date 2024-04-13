import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Efetuar o login de um usuário' })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciais necessárias para o login.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário logado com sucesso',
    schema: { type: 'object', example: { accessToken: 'jwt-token-aqui' } },
  })
  @ApiResponse({ status: 400, description: 'Requisição Incorreta' })
  @ApiResponse({ status: 401, description: 'Não Autorizado' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
