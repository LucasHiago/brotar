import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpeciesService } from './species.service';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly species: SpeciesService) {}

  @Get()
  findAll() {
    return this.species.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.species.findOne(id);
  }
}
