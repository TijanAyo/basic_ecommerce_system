import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class updateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(180)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  summary: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  category: string;
}
