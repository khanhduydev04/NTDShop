import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// Lưu token vào cookies
export const saveToken = (token) => {
  Cookies.set("jwt_token", token, { expires: 7 }); // Token lưu trong 7 ngày
};

// Lấy token từ cookies
export const getToken = () => {
  return Cookies.get("jwt_token");
};

// Xóa token từ cookies
export const removeToken = () => {
  Cookies.remove("jwt_token");
};

// Decode token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// Kiểm tra token còn hợp lệ không (chỉ kiểm tra expiration)
export const isTokenValid = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;
  const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây
  return decoded.exp > currentTime;
};
