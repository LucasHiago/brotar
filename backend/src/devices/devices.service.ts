import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly repo: Repository<Device>,
  ) {}

  findAll(userId: string): Promise<Device[]> {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async register(userId: string, serial: string): Promise<Device> {
    const existing = await this.repo.findOne({ where: { serial } });
    if (existing) throw new ConflictException('Sensor já registrado');
    const device = this.repo.create({ userId, serial, plantId: null });
    return this.repo.save(device);
  }

  async pair(userId: string, id: string, plantId: string): Promise<Device> {
    const device = await this.findOne(userId, id);
    device.plantId = plantId;
    return this.repo.save(device);
  }

  async findOne(userId: string, id: string): Promise<Device> {
    const device = await this.repo.findOne({ where: { id, userId } });
    if (!device) throw new NotFoundException('Sensor não encontrado');
    return device;
  }

  /** Usado pela ingestão de leituras: localizar pelo serial. */
  findBySerial(serial: string): Promise<Device | null> {
    return this.repo.findOne({ where: { serial } });
  }

  async touch(device: Device, bateriaPct?: number): Promise<void> {
    device.ultimaSincronizacao = new Date();
    if (bateriaPct !== undefined) device.bateriaPct = bateriaPct;
    await this.repo.save(device);
  }
}
