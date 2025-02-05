import axiosInstance from "@/configs/api";

export const getDefaultAddressForOrder = async (userId) => {
  try {
    const response = await axiosInstance.get(`/address/order/default/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const selectAddressForOrder = async (userId, addressId) => {
  try {
    const response = await axiosInstance.get(`/address/order/select/${userId}/${addressId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const createAddress = async (address) => {
  try {
    const response = await axiosInstance.post(`/address`, address);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const getAllAddresses = async (userId) => {
  try {
    const response = await axiosInstance.get(`/address/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const updateAddress = async (addressId, updatedAddressDto) => {
  try {
    const response = await axiosInstance.patch(`/address/${addressId}`, updatedAddressDto);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const deleteAddress = async (addressId) => {
  try {
    const response = await axiosInstance.delete(`/address/${addressId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

export const setDefaultAddress = async (userId, addressId) => {
    try {
        const response = await axiosInstance.patch(`/address/default/${addressId}?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đặt địa chỉ mặc định:", error);
        throw error;
    }
};