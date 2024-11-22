import { OrderRepository } from '@/data/repositories/OrderRepository';
import { Order } from '@/domain/entities/Order';

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

  async updateOrder(id: number, order: Partial<Order>): Promise<Order | null> {
    await this.repository.update(id, order);
    return this.repository.findById(id);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async listOrdersByStatus(status: string): Promise<Order[]> {
    return this.repository.findByStatus(status);
  }
}
