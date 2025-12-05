// src/config/database.config.ts
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { envConfig } from './env.config';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  logging: false,
};
