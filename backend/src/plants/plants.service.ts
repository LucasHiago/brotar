import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesService } from '../species/species.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private readonly repo: Repository<Plant>,
    private readonly species: SpeciesService,
  ) {}

  findAll(userId: string): Promise<Plant[]> {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findOne(userId: string, id: string): Promise<Plant> {
    const plant = await this.repo.findOne({ where: { id, userId } });
    if (!plant) throw new NotFoundException('Árvore não encontrada');
    return plant;
  }

  create(userId: string, dto: CreatePlantDto): Promise<Plant> {
    // valida que a espécie existe no catálogo
    this.species.findOne(dto.especieId);
    const plant = this.repo.create({ ...dto, userId });
    return this.repo.save(plant);
  }

  async update(userId: string, id: string, dto: UpdatePlantDto): Promise<Plant> {
    if (dto.especieId) this.species.findOne(dto.especieId);
    const plant = await this.findOne(userId, id);
    Object.assign(plant, dto);
    return this.repo.save(plant);
  }

  async remove(userId: string, id: string): Promise<void> {
    const plant = await this.findOne(userId, id);
    await this.repo.remove(plant);
  }
}
