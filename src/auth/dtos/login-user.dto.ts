import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: true })
  status: string;

  @ApiProperty({ example: 'Authorization successful' })
  message: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiCJ9.eyJzdWIiOiJjbTBoNDgzenYNTY3MTl9.0_5tJR7ZkvwpDkgpD8-Gog4vA4B8c4',
    nullable: true,
  })
  data: string;
}
