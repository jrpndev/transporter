import { Repository } from 'typeorm';
import { AppDataSource } from '../../core/config/ormconfig';
import { Order } from '../../domain/entities/Order';

export class OrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = AppDataSource.getRepository(Order);
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Order | null> {
    return this.repository.findOneBy({ id });
  }

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.repository.create(order);
    return this.repository.save(newOrder);
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    await this.repository.update(id, order);
    return this.repository.findOneBy({ id }) as Order;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
