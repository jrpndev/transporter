import { AppDataSource } from "@/core/config/ormconfig";
import { Order } from "@/domain/entities/Order";
import { Repository } from "typeorm";


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

  async update(id: number, order: Partial<Order>): Promise<void> {
    await this.repository.update(id, order);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
