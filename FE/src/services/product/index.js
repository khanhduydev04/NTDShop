import axiosInstance from "@/configs/api";

export const getProductsFilter = async (params) => {
  try {
    const { data } = await axiosInstance.get("/products/active", { params });
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const getTopDiscountedProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/products/sales");
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const searchProducts = async (params) => {
  try {
    const { data } = await axiosInstance.get("/products/search", { params });
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const getProductDetail = async (slug) => {
  try {
    const { data } = await axiosInstance.get(`/products/slug/${slug}`);
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
