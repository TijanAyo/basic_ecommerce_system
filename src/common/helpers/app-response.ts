import { ApiProperty } from '@nestjs/swagger';

export class AppResponse {
  static Ok(data: any | null, message: string) {
    return {
      data,
      message,
      success: true,
    };
  }

  static Error(message: string, errors?: any) {
    return {
      errors,
      message,
      success: false,
    };
  }
}

export const ErrorMessage = {
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED_ACCESS',
  FORBIDDEN: 'FORBIDDEN_ACCESS',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  VALIDATION_ERROR: 'VALIDATION_ERROR_OCCURRED',
};

export class ErrorResponseDto {
  @ApiProperty({ example: 'BAD_REQUEST', description: 'Error code' })
  error: string;

  @ApiProperty({
    example: 'An unexpected error has occurred',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({ example: false, description: 'Success flag' })
  success: boolean;
}
