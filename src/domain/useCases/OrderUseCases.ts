import { Order } from '../entities/Order';
import { OrderRepository } from '../../data/repositories/OrderRepository';

export class OrderUseCase {
  private repository: OrderRepository;

  constructor() {
    this.repository = new OrderRepository();
  }

  async listOrders(): Promise<Order[]> {
    return this.repository.findAll();
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.repository.findById(id);
  }

  async createOrder(order: Partial<Order>): Promise<Order> {
    return this.repository.create(order);
  }

  async updateOrder(id: number, order: Partial<Order>): Promise<Order> {
    return this.repository.update(id, order);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
