// src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot(databaseConfig), // Config  load
    UsersModule,

  ],
})
export class AppModule {}
