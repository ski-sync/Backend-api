import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/roles/roles.guard';
import { UserDto } from './dto/user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { plainToInstance } from 'class-transformer';
import { SearchUserDto } from './dto/search-user.dto';
import { AuthUser } from 'src/auth/auth.decorator';
import { DeleteUserDto } from './dto/delete-user.dto';
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
@ApiTags('users')
/**
 * Controller class for managing user-related operations.
 */
export class UsersController {
  constructor(private userService: UserService) {}

  /**
   * Get all users.
   * @returns A promise that resolves to an array of UserDto objects.
   */
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

  /**
   * Search users based on the provided search criteria.
   * @param searchUserDto - The search criteria.
   * @returns A promise that resolves to an array of UserDto objects.
   */
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
        AND: [
          {
            uuid: {
              equals: filter.uuid,
            },
          },
          {
            email: {
              contains: filter.email,
            },
          },
          {
            name: {
              contains: filter.name,
            },
          },
        ],
      },
    });
    return users.map(user => plainToInstance(UserDto, user));
  }

  /**
   * Get the currently authenticated user.
   * @param user - The authenticated user.
   * @returns A promise that resolves to a UserDto object.
   */
  @ApiCreatedResponse({
    description: 'Get user',
    type: UserDto,
  })
  @Get('me')
  async getMe(@AuthUser() user: any): Promise<UserDto> {
    const findUser = await this.userService.findOne({ uuid: user.sub });
    return plainToInstance(UserDto, findUser);
  }

  /**
   * Delete user.
   * @param uuid - The user uuid.
   * @returns A promise that resolves to a UserDto object.
   */

  @ApiCreatedResponse({
    description: 'Delete user',

    type: UserDto,
  })
  @Delete('delete')
  @Roles(['admin'])
  async deleteUser(@Body() uuid: DeleteUserDto): Promise<UserDto> {
    const deleteuser = await this.userService.deleteUser({ uuid: uuid.uuid, deletedAt: null });
    return plainToInstance(UserDto, deleteuser);
  }
}
