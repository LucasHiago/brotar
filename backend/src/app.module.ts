import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SpeciesModule } from './species/species.module';
import { PlantsModule } from './plants/plants.module';
import { DevicesModule } from './devices/devices.module';
import { ReadingsModule } from './readings/readings.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('database.host'),
        port: cfg.get<number>('database.port'),
        username: cfg.get<string>('database.username'),
        password: cfg.get<string>('database.password'),
        database: cfg.get<string>('database.database'),
        ssl: cfg.get<boolean>('database.ssl') ? { rejectUnauthorized: false } : false,
        synchronize: cfg.get<boolean>('database.synchronize'),
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    AuthModule,
    UsersModule,
    SpeciesModule,
    PlantsModule,
    DevicesModule,
    ReadingsModule,
    EvaluationModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
