import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadingsService } from '../readings/readings.service';
import { SpeciesService } from '../species/species.service';
import { Plant } from '../plants/entities/plant.entity';
import { evaluate, overallStatus, recommend } from './rules';

@Injectable()
export class EvaluationService {
  constructor(
    private readonly readings: ReadingsService,
    private readonly species: SpeciesService,
  ) {}

  /** Estado atual de uma árvore: leitura mais recente x faixa da espécie. */
  async status(plant: Plant) {
    const species = this.species.get(plant.especieId);
    if (!species) throw new NotFoundException('Espécie da árvore não está no catálogo');

    const reading = await this.readings.latest(plant.id);
    if (!reading) {
      return {
        plantId: plant.id,
        especie: species.nome_popular,
        overall: 'ok' as const,
        semLeitura: true,
        metrics: [],
        recommendations: [],
      };
    }

    const metrics = evaluate(reading, species);
    return {
      plantId: plant.id,
      especie: species.nome_popular,
      medidoEm: reading.medidoEm,
      overall: overallStatus(metrics),
      semLeitura: false,
      metrics,
      recommendations: recommend(reading, species),
    };
  }
}
