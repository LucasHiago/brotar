import { Module } from '@nestjs/common';
import { PlantsModule } from '../plants/plants.module';
import { ReadingsModule } from '../readings/readings.module';
import { SpeciesModule } from '../species/species.module';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';

@Module({
  imports: [ReadingsModule, SpeciesModule, PlantsModule],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
