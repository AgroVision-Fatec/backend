import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { FazendasModule } from './fazendas/fazendas.module';
import { TalhoesModule } from './talhoes/talhoes.module';
import { ArmadilhasModule } from './armadilhas/armadilhas.module';
import { DadosArmadilhasModule } from './dados-armadilhas/dados-armadilhas.module';
import { GeojsonModule } from './geojson/geojson.module';
import { FazendasCoordenadasModule } from './fazendas-coordenadas/fazendas-coordenadas.module';
import { TalhoesCoordenadasModule } from './talhoes-coordenadas/talhoes-coordenadas.module';
import { ImagensModule } from './imagens/imagens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // torna as variáveis de ambiente disponíveis globalmente
      envFilePath: '.env', // Localização do seu arquivo .env
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // ou qualquer outro banco de dados suportado
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.TYPEORM_SYNC === 'true', // Deve ser false em produção
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
    }),
    UsersModule,
    AuthModule,
    FazendasModule,
    TalhoesModule,
    ArmadilhasModule,
    DadosArmadilhasModule,
    GeojsonModule,
    FazendasCoordenadasModule,
    TalhoesCoordenadasModule,
    ImagensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
