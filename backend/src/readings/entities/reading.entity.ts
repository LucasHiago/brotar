import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'readings' })
@Index(['plantId', 'medidoEm'])
export class Reading {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'bigint', name: 'plant_id' })
  plantId!: string;

  @Column({ type: 'bigint', name: 'device_id', nullable: true })
  deviceId!: string | null;

  @Column({ type: 'timestamptz', name: 'medido_em' })
  medidoEm!: Date;

  // grandezas (todas opcionais — o sensor pode não medir alguma)
  @Column({ type: 'real', name: 'umidade_solo_pct', nullable: true })
  umidadeSoloPct!: number | null;

  @Column({ type: 'real', nullable: true })
  ph!: number | null;

  @Column({ type: 'real', name: 'luz_horas', nullable: true })
  luzHoras!: number | null;

  @Column({ type: 'real', nullable: true })
  n!: number | null;

  @Column({ type: 'real', nullable: true })
  p!: number | null;

  @Column({ type: 'real', nullable: true })
  k!: number | null;

  @Column({ type: 'real', name: 'temperatura_c', nullable: true })
  temperaturaC!: number | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'recebido_em' })
  recebidoEm!: Date;
}
