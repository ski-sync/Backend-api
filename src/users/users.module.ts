import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  providers: [DatabaseService, UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
