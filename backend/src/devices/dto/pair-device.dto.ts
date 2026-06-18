import { IsString } from 'class-validator';

export class PairDeviceDto {
  /** id da árvore à qual o sensor será associado. */
  @IsString()
  plantId!: string;
}
