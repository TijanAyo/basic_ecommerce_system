import { Body, Controller, Patch, UseGuards, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../common/decorators';
import { AccountGuard, AuthorizeGuard, RolesGuard } from '../common/guards';
import { roles } from '../common/interfaces';
import { modifyUserStatusDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

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
