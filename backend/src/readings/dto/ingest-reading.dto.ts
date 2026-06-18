import { IsNumber, IsOptional, IsString } from 'class-validator';

/** Payload enviado pelo sensor (ESP32) via Wi-Fi. Identifica-se pelo serial. */
export class IngestReadingDto {
  @IsString()
  serial!: string;

  @IsOptional()
  @IsNumber()
  umidadeSoloPct?: number;

  @IsOptional()
  @IsNumber()
  ph?: number;

  @IsOptional()
  @IsNumber()
  luzHoras?: number;

  @IsOptional()
  @IsNumber()
  n?: number;

  @IsOptional()
  @IsNumber()
  p?: number;

  @IsOptional()
  @IsNumber()
  k?: number;

  @IsOptional()
  @IsNumber()
  temperaturaC?: number;

  @IsOptional()
  @IsNumber()
  bateriaPct?: number;
}
