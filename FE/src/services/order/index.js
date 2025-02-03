import axiosInstance from "@/configs/api";

export const getOrdersByUserId = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/orders/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async (order) => {
  try {
    const response = await axiosInstance.post("/orders", order); 
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, paymentStatus, status) => {
  try {
    const response = await axiosInstance.put(`/orders/status/${orderId}`, {
      PaymentStatus: paymentStatus,
      Status: status,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for order with ID ${orderId}:`, error);
    throw error;
  }
};

// Cập nhật đơn hàng
export const updateOrder = async (id, updatedOrder) => {
  try {
    const response = await axiosInstance.put(`/orders/${id}`, updatedOrder);
    return response.data;
  } catch (error) {
    console.error(`Error updating order with ID ${id}:`, error);
    throw error;
  }
};

// Xóa đơn hàng
export const deleteOrder = async (id) => {
  try {
    const response = await axiosInstance.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order with ID ${id}:`, error);
    throw error;
  }
};