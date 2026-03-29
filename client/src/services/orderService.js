import api from '../utils/api';


export const orderService = {
  create: async (orderData) => {
    try {

      const demoOrder = {
        id: `order_${Date.now()}`,
        orderNumber: `ORD-${Math.floor(Math.random() * 100000)}`,
        ...orderData,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
      };

      return { data: demoOrder };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getUserOrders: async () => {
    try {

      return { data: [] };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  getById: async (orderId) => {
    try {

      const demoOrder = {
        id: orderId,
        orderNumber: `ORD-${Math.floor(Math.random() * 100000)}`,
        status: 'pending',
        items: [],
        total: 0,
      };

      return { data: demoOrder };
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  updateStatus: async (orderId, status) => {
    try {

      return { data: { id: orderId, status } };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },
};

export default orderService;
