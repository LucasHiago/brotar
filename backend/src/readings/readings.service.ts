import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevicesService } from '../devices/devices.service';
import { IngestReadingDto } from './dto/ingest-reading.dto';
import { Reading } from './entities/reading.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly repo: Repository<Reading>,
    private readonly devices: DevicesService,
  ) {}

  /** Recebe uma leitura do sensor. O sensor se identifica pelo serial. */
  async ingest(dto: IngestReadingDto): Promise<Reading> {
    const device = await this.devices.findBySerial(dto.serial);
    if (!device) throw new BadRequestException('Sensor não registrado');
    if (!device.plantId) {
      throw new BadRequestException('Sensor ainda não pareado com uma árvore');
    }

    const reading = this.repo.create({
      plantId: device.plantId,
      deviceId: device.id,
      medidoEm: new Date(),
      umidadeSoloPct: dto.umidadeSoloPct ?? null,
      ph: dto.ph ?? null,
      luzHoras: dto.luzHoras ?? null,
      n: dto.n ?? null,
      p: dto.p ?? null,
      k: dto.k ?? null,
      temperaturaC: dto.temperaturaC ?? null,
    });
    const saved = await this.repo.save(reading);
    await this.devices.touch(device, dto.bateriaPct);
    return saved;
  }

  listByPlant(plantId: string, limit = 50): Promise<Reading[]> {
    return this.repo.find({
      where: { plantId },
      order: { medidoEm: 'DESC' },
      take: limit,
    });
  }

  latest(plantId: string): Promise<Reading | null> {
    return this.repo.findOne({
      where: { plantId },
      order: { medidoEm: 'DESC' },
    });
  }
}
