import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from '../devices/devices.module';
import { PlantsModule } from '../plants/plants.module';
import { Reading } from './entities/reading.entity';
import { ReadingsController } from './readings.controller';
import { ReadingsService } from './readings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reading]), DevicesModule, PlantsModule],
  controllers: [ReadingsController],
  providers: [ReadingsService],
  exports: [ReadingsService],
})
export class ReadingsModule {}
