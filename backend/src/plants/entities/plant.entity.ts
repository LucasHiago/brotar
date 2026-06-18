import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'plants' })
export class Plant {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Index()
  @Column({ type: 'bigint', name: 'user_id' })
  userId!: string;

  @Column({ type: 'text' })
  apelido!: string;

  /** id da espécie no catálogo (ex.: 'limoeiro'). */
  @Column({ type: 'text', name: 'especie_id' })
  especieId!: string;

  @Column({ type: 'text', nullable: true })
  local!: string | null;

  @Column({ type: 'text', name: 'foto_url', nullable: true })
  fotoUrl!: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}
