import BASE_URL from "../../../core/api";
import HttpClient from "../../../network/httpClient";
import { Order } from "../types/Order";

const httpClient = new HttpClient(BASE_URL);

export const fetchOrders = async (status?: string): Promise<Order[]> => {
  const url = status ? `/orders?status=${status}` : '/orders';
  const orders = await httpClient.get<Order[]>(url);
  return orders;
};

export const createOrder = async (order: Order): Promise<Order> => {
  const createdOrder = await httpClient.post<Order>('/orders', order);
  return createdOrder;
};

export const updateOrder = async (order: Order): Promise<Order> => {
  const updatedOrder = await httpClient.put<Order>(`/orders/${order.id}`, order);
  return updatedOrder;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await httpClient.delete<void>(`/orders/${id}`);
};
