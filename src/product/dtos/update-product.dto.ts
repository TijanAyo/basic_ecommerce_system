import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProductAction } from '../../common/interfaces';

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

export class updateProductStatusDto {
  @IsString()
  @IsEnum(ProductAction, {
    message: 'action must be either Approve or Disapprove',
  })
  @ApiProperty({ enum: ProductAction })
  action: ProductAction;
}
