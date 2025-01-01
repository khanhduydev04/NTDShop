import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full">
        <h2 className="text-2xl text-primary font-bold text-center mb-6">Đăng Nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Số điện thoại */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded border-gray-300 text-black"
              placeholder="Nhập số điện thoại"
              {...register("phone", { 
                required: "Số điện thoại là bắt buộc", 
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ"
                }
              })}
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
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
              {...register("password", { required: "Mật khẩu là bắt buộc" })}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-primary text-center mt-3">
          <span className="text-black">Chưa có tài khoản?</span> <Link to="/dang-ky" className="text-blue-500">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};
