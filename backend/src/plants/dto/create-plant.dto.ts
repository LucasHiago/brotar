import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @MinLength(1)
  apelido!: string;

  @IsString()
  @MinLength(1)
  especieId!: string;

  @IsOptional()
  @IsString()
  local?: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;
}
