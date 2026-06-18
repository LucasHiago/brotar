import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlantsService } from '../plants/plants.service';
import { EvaluationService } from './evaluation.service';

@ApiTags('evaluation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('plants')
export class EvaluationController {
  constructor(
    private readonly evaluation: EvaluationService,
    private readonly plants: PlantsService,
  ) {}

  @Get(':id/status')
  async status(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const plant = await this.plants.findOne(user.id, id);
    return this.evaluation.status(plant);
  }
}
