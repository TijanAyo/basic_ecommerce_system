import { Body, Controller, Patch, UseGuards, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorators';
import { AccountGuard, AuthorizeGuard, RolesGuard } from '../common/guards';
import { roles } from '../common/interfaces';
import { modifyUserStatusDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/helpers';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: 'Ban or Unban user accounts - Admin Functionality' })
  @UseGuards(AuthorizeGuard, AccountGuard, RolesGuard)
  @Roles(roles.admin)
  @Patch('/:userId/ban-or-unban')
  async restrictUserAccount(
    @Body() payload: modifyUserStatusDto,
    @Param('userId') userId: string,
    @Req() req: any,
  ) {
    const user = req.user;
    return await this._userService.restrictUserAccount(
      payload,
      userId,
      user.sub,
    );
  }
}
