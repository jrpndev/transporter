import { DataSource } from 'typeorm';
import { Order } from '@/domain/entities/Order';

import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'admin123',
  database: process.env.POSTGRES_DB || 'transporter',
  synchronize: true,
  logging: true,
  entities: [Order],
});
