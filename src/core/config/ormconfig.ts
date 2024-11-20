import { DataSource } from 'typeorm';
import { Order } from "@"
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './orders.sqlite',
  synchronize: true, // Em produção, use migrations!
  logging: true,
  entities: [Order],
});
