import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'devices' })
export class Device {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Index()
  @Column({ type: 'bigint', name: 'user_id' })
  userId!: string;

  /** árvore pareada (um sensor por árvore). */
  @Column({ type: 'bigint', name: 'plant_id', nullable: true })
  plantId!: string | null;

  @Index({ unique: true })
  @Column({ type: 'text', name: 'serial' })
  serial!: string;

  @Column({ type: 'int', name: 'bateria_pct', nullable: true })
  bateriaPct!: number | null;

  @Column({ type: 'text', name: 'firmware', nullable: true })
  firmware!: string | null;

  @Column({ type: 'timestamptz', name: 'ultima_sincronizacao', nullable: true })
  ultimaSincronizacao!: Date | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}
