import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/auth";
import { saveToken } from "@/utils/auth";

// Define Zod schema based on DTO
const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      console.log("login", response);
      if (response && response.token) {
        saveToken(response.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full">
        <h2 className="text-2xl text-primary font-bold text-center mb-6">
          Đăng Nhập
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Tên đăng nhập */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded border-gray-300 text-black"
              placeholder="Nhập tên đăng nhập"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded border-gray-300 text-black"
              placeholder="Nhập mật khẩu của bạn"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-primary text-center mt-3">
          <span className="text-black">Chưa có tài khoản?</span>{" "}
          <Link to="/dang-ky" className="text-blue-500">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};
