import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { getEnhancedStatusByCode } from '../utils/api-status.util';
import { AppResponse } from '../interfaces/appResponse.interface';
import { log } from '../utils/logger.util';
import { AddUserDto } from './dtos/add-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) // todo
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findById(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        username,
      },
    });
  }

  async remove(id: number): Promise<AppResponse> {
    const user = await this.findById(id);
    await user.destroy();
    return getEnhancedStatusByCode(204);
  }

  async add(user: AddUserDto): Promise<AppResponse> {
    log.draw([user], 'cyan', 'blue');
    await this.userModel.create({ ...user });
    return getEnhancedStatusByCode(201);
  }
}
