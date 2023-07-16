import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class GetAllFilesDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page = 1;

  @IsOptional()
  @IsNumber()
  size = 25;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  search: string;
}
