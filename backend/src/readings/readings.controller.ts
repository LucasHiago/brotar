import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlantsService } from '../plants/plants.service';
import { IngestReadingDto } from './dto/ingest-reading.dto';
import { ReadingsService } from './readings.service';

@ApiTags('readings')
@Controller()
export class ReadingsController {
  constructor(
    private readonly readings: ReadingsService,
    private readonly plants: PlantsService,
  ) {}

  /** Ingestão pública do sensor (autenticada pelo serial). Sem JWT. */
  @Post('readings')
  ingest(@Body() dto: IngestReadingDto) {
    return this.readings.ingest(dto);
  }

  /** Histórico de uma árvore (protegido, dono apenas). */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('plants/:id/readings')
  async listByPlant(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    await this.plants.findOne(user.id, id); // garante posse
    return this.readings.listByPlant(id);
  }
}
