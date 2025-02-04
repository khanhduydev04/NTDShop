import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from "@/services/auth";
import { useToast } from "@/hooks/use-toast";

// Định nghĩa schema validation bằng Zod
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Họ và tên là bắt buộc")
      .max(100, "Họ và tên không thể dài hơn 100 ký tự"),
    username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
    phoneNumber: z
      .string()
      .min(1, "Số điện thoại là bắt buộc")
      .regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    gender: z.enum(["Nam", "Nữ", "Không xác định"], {
      invalid_type_error: "Chỉ nhận các giá trị Nam, Nữ, hoặc Không xác định.",
    }),
    role: z.string().default("Customer"),
    address: z.string().min(1, "Địa chỉ là bắt buộc"),
    dateOfBirth: z
      .string()
      .optional()
      .refine(
        (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
        "Ngày sinh không hợp lệ (định dạng YYYY-MM-DD)"
      ),
    password: z
      .string()
      .min(1, "Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu và xác nhận mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data) => {
    try {
      const response = await registerApi(data);
      if (response) {
        toast({
          variant: "success",
          title: "Đăng ký thành công!",
        });
        navigate("/dang-nhap");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          variant: "destructive",
          title: "Đăng ký thất bại!",
          description: error.response.data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Đăng ký thất bại!",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-5">
      <div className="bg-white shadow-lg rounded-lg px-5 py-2 md:px-8 md:py-6 max-w-md lg:max-w-4xl w-full">
        <h2 className="text-2xl text-primary font-bold text-center mb-6">
          Đăng Ký
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Họ và tên */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Họ và Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded border-gray-300"
                placeholder="Nhập họ và tên"
                {...register("fullName")}
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Tên đăng nhập */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tên đăng nhập <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded border-gray-300"
                placeholder="Nhập tên đăng nhập"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded border-gray-300"
                placeholder="Nhập số điện thoại"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded border-gray-300"
                placeholder="Nhập email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Giới tính */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Giới tính
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Nam"
                    {...register("gender")}
                    className="w-4 h-4"
                  />
                  Nam
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Nữ"
                    {...register("gender")}
                    className="w-4 h-4"
                  />
                  Nữ
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="Không xác định"
                    {...register("gender")}
                    className="w-4 h-4"
                  />
                  Không xác định
                </label>
              </div>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded border-gray-300"
                placeholder="Nhập địa chỉ của bạn"
                {...register("address")}
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ngày sinh
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded border-gray-300"
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded border-gray-300"
                placeholder="Nhập mật khẩu"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded border-gray-300"
                placeholder="Xác nhận mật khẩu"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-primary text-center mt-3">
          <span className="text-black">Bạn đã có tài khoản?</span>{" "}
          <Link to="/dang-nhap" className="text-blue-500">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};
