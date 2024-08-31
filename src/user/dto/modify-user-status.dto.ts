import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { ProductAction, UserAction } from 'src/common/interfaces';

export class modifyUserStatusDto {
  @IsString()
  @IsEnum(UserAction, {
    message: 'action must be either BAN or UNBAN',
  })
  @ApiProperty({ enum: ProductAction })
  action: UserAction;
}
