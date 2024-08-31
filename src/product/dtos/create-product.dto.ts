import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class createProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(180)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(180)
  @IsOptional()
  @ApiProperty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  category: string;
}

export class createProductResponseDto {
  @ApiProperty({ example: true })
  status: string;

  @ApiProperty({ example: 'Product create successfully and awaiting approval' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  data: any;
}
