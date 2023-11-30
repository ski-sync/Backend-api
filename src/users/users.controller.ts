import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/roles/roles.guard';
import { UserDto } from './dto/user.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { SearchUserDto } from './dto/search-user.dto';
import { AuthUser } from 'src/auth/auth.decorator';
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({
    description: 'Get all users',
    type: [UserDto],
  })
  @Get()
  @Roles(['admin'])
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userService.users({});
    return users.map(user => plainToInstance(UserDto, user));
  }

  @ApiCreatedResponse({
    description: 'Search users',
    type: [UserDto],
  })
  @Get('search')
  @Roles(['admin'])
  async searchUsers(@Body() searchUserDto: SearchUserDto): Promise<UserDto[]> {
    const filter = plainToInstance(SearchUserDto, searchUserDto);
    const users = await this.userService.users({
      where: {
        AND: [{ name: { contains: filter.name } }, { email: { contains: filter.email } }],
      },
    });
    return users.map(user => plainToInstance(UserDto, user));
  }

  @ApiCreatedResponse({
    description: 'Get user',
    type: UserDto,
  })
  @Get('me')
  @Roles(['admin', 'user'])
  async getMe(@AuthUser() user: any): Promise<UserDto> {
    const findUser = await this.userService.findOne({ uuid: user.sub });
    return plainToInstance(UserDto, findUser);
  }
}
