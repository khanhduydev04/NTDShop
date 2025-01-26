import axiosInstance from "@/configs/api";

export const getOrdersByUserId = async (customerId) => {
  try {
    const response = await axiosInstance.get(`/orders/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
