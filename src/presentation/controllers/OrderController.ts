import { OrderUseCase } from '@/domain/useCases/OrderUseCases';
import { Request, Response } from 'express';

const useCase = new OrderUseCase();

export const OrderController = {
  async getAll(req: Request, res: Response) {
    const orders = await useCase.listOrders();
    res.json(orders);
  },

  async getOne(req: Request, res: Response) {
    const order = await useCase.getOrderById(Number(req.params.id));
    res.json(order);
  },

  async create(req: Request, res: Response) {
    const newOrder = await useCase.createOrder(req.body);
    res.status(201).json(newOrder);
  },

  async update(req: Request, res: Response) {
    const updatedOrder = await useCase.updateOrder(Number(req.params.id), req.body);
    res.json(updatedOrder);
  },

  async delete(req: Request, res: Response) {
    await useCase.deleteOrder(Number(req.params.id));
    res.status(204).send();
  },
};
