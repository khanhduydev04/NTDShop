import axiosInstance from "@/configs/api";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/utils/auth"; 

export const register = async (data) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async (token) => {
  try {
    const response = await axiosInstance.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// example data = {fullName, phoneNumber, address, username, gender, email, dateOfBirth} *optional
export const changeProfile = async (data, token) => {
  try {
    const response = await axiosInstance.put("/change-profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// example data = { oldPassword, password, confirmPassword }
export const changePassword = async (data, token) => {
  try {
    const response = await axiosInstance.put("/change-password", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

