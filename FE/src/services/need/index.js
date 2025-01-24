import axiosInstance from "../../configs/api";

export const getNeeds = async () => {
  try {
    const { data } = await axiosInstance.get("/needs");
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
