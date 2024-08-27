import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './configs/database.config';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig as SequelizeModuleOptions),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
