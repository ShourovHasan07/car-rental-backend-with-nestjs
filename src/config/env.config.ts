
import * as dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'shourov123',
  DB_NAME: process.env.DB_NAME || 'car_rental',
};

