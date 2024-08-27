import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { AppResponse } from '../interfaces/appResponse.interface';
import { AddUserDto } from './dtos/add-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('get-user/:id')
  async getUserById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Post('add-user')
  async addUser(
    @Body(new ValidationPipe()) addUserDto: AddUserDto,
  ): Promise<AppResponse> {
    return await this.usersService.add(addUserDto);
  }
}
