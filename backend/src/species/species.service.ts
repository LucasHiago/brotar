import { Injectable, NotFoundException } from '@nestjs/common';
import type { Species } from './species.types';
// Catálogo é a mesma fonte de data/species/catalog.json (copiado via `make sync-catalog`).
// nest-cli copia o .json para dist/ (ver nest-cli.json "assets").
import catalog from './catalog.json';

@Injectable()
export class SpeciesService {
  private readonly species: Species[] = (catalog as { especies: Species[] }).especies;

  findAll(): Species[] {
    return this.species;
  }

  findOne(id: string): Species {
    const found = this.species.find((s) => s.id === id);
    if (!found) throw new NotFoundException(`Espécie '${id}' não encontrada`);
    return found;
  }

  /** Não lança — usado internamente pela avaliação. */
  get(id: string): Species | undefined {
    return this.species.find((s) => s.id === id);
  }
}
