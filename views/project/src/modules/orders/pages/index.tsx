import React, { useEffect, useState } from 'react';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from '../services/orderService';
import { Order } from '../types/Order';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Typography, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Order>({
    id: 0,
    supplierName: '',
    orderDate: new Date().toISOString(),
    status: 'Pending',
    totalValue: 0,
    products: [],
  });
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
        console.log(data)

        setFilteredOrders(data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };
    loadOrders();
  }, []);

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    if (status === '') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };
  const resetForm = () => {
    setNewOrder({
      id: 0,
      supplierName: '',
      orderDate: '',
      status: 'Pending',
      totalValue: 0,
      products: [],
    });
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const validateForm = (): boolean => {
    if (!newOrder.supplierName || !newOrder.orderDate || !newOrder.status || newOrder.totalValue <= 0) {
      toast.error('Todos os campos devem ser preenchidos!');
      return false;
    }
    if (newOrder.products.length === 0 || newOrder.products.some(product => !product.name || product.quantity <= 0)) {
      toast.error('Todos os produtos devem ter nome e quantidade maior que zero!');
      return false;
    }
    return true;
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const orderToSave = {
        ...newOrder,
        orderDate: new Date(newOrder.orderDate).toISOString(),
      };
      await createOrder(orderToSave);
      await loadOrders();
      resetForm();
      toast.success('Pedido criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      toast.error('Erro ao criar pedido!');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async () => {
    if (!validateForm() || !selectedOrder) return;

    setLoading(true);
    try {
      await updateOrder(newOrder);
      await loadOrders();
      resetForm();
      toast.success('Pedido atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      toast.error('Erro ao atualizar pedido!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    setLoading(true);
    try {
      await deleteOrder(id);
      await loadOrders();
      toast.success('Pedido excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      toast.error('Erro ao excluir pedido!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    const newProduct = { name: '', quantity: 0 };
    setNewOrder({ ...newOrder, products: [...newOrder.products, newProduct] });
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = [...newOrder.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setNewOrder({ ...newOrder, products: updatedProducts });
  };

  return (
    <div className="orders-page" style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center' }}>
      <ToastContainer />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={(e) => handleFilterChange(e.target.value)} disabled={loading}>
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)} disabled={loading}>
          Criar Novo Pedido
        </Button>
      </div>

      {filteredOrders.length === 0 ? (
        <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
          Não há pedidos para o status selecionado.
        </Typography>
      ) : (
        filteredOrders.map((order) => (
          <div key={order.id} style={{ border: '1px solid black', padding: '20px', margin: '10px', borderRadius: '10px' }}>
            <Typography variant="h6">{order.supplierName}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>Valor Total: R$ {order.totalValue}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedOrder(order);
                setNewOrder(order);
                setIsModalOpen(true);
              }}
            >
              Editar
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDeleteOrder(order.id)}>
              Excluir
            </Button>
          </div>
        ))
      )}

      <Dialog open={isModalOpen} onClose={resetForm}>
        <DialogTitle>{selectedOrder ? 'Editar Pedido' : 'Criar Pedido'}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Nome do Fornecedor"
              value={newOrder.supplierName}
              onChange={(e) => setNewOrder({ ...newOrder, supplierName: e.target.value })}
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <TextField
              label="Data do Pedido"
              type="date"
              value={newOrder.orderDate.split('T')[0]}
              onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={loading}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select value={newOrder.status} onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })} disabled={loading}>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Valor Total"
              type="number"
              value={newOrder.totalValue}
              onChange={(e) => setNewOrder({ ...newOrder, totalValue: parseFloat(e.target.value) || 0 })}
              fullWidth
              margin="normal"
              disabled={loading}
            />
            <Typography variant="h6" style={{ marginTop: '20px' }}>Produtos</Typography>
            {newOrder.products.map((product, index) => (
              <div key={index}>
                <TextField
                  label={`Nome do Produto ${index + 1}`}
                  value={product.name}
                  onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                  fullWidth
                  margin="normal"
                  disabled={loading}
                />
                <TextField
                  label={`Quantidade ${index + 1}`}
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10))}
                  fullWidth
                  margin="normal"
                  disabled={loading}
                />
              </div>
            ))}
            <Button variant="outlined" onClick={handleAddProduct} disabled={loading}>
              Adicionar Produto
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm} color="secondary" disabled={loading}>Cancelar</Button>
          <Button onClick={selectedOrder ? handleUpdateOrder : handleCreateOrder} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : selectedOrder ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
