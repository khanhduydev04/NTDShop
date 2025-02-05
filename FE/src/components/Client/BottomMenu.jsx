import { Home, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getToken, removeToken, decodeToken, isTokenValid } from "@/utils/auth";
import { getCategories } from "@/services/category";
import { useEffect, useState } from "react";

const BottomMenu = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) {
      const decoded = decodeToken(token);
      if (decoded && decoded.username) {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
      removeToken();
    }
  }, [location.pathname]);

  // Fetch danh mục khi mở dialog
  useEffect(() => {
    if (isCategoryOpen) {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (error) {
          console.error("Lỗi khi lấy danh mục:", error);
        }
      };
      fetchCategories();
    }
  }, [isCategoryOpen]);

  return (
    <>
      {/* Bottom Menu */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md shadow-white border-t border-gray-200 z-[99]">
        <div className="flex justify-around items-center py-2 text-xs text-gray-600">
          <Link
            to={"/"}
            className="flex flex-col items-center hover:text-textPrimary transition-colors"
          >
            <Home className="w-6 h-6" />
            <span>Trang chủ</span>
          </Link>

          {/* Danh mục */}
          <div
            className="flex flex-col items-center hover:text-textPrimary transition-colors cursor-pointer"
            onClick={() => setIsCategoryOpen(true)}
          >
            <Menu className="w-6 h-6" />
            <span>Danh mục</span>
          </div>

          {/* Tìm kiếm */}
          <div className="flex flex-col items-center hover:text-textPrimary transition-colors">
            <Search className="w-6 h-6" />
            <span>Tìm kiếm</span>
          </div>

          {/* Đăng nhập */}
          <Link
            to={isLogin ? "/thong-tin-ca-nhan" : "/dang-nhap"}
            className="flex flex-col items-center hover:text-textPrimary transition-colors"
          >
            <User className="w-6 h-6" />
            <span>{isLogin ? "Tài khoản" : "Đăng nhập"}</span>
          </Link>

          {/* Giỏ hàng */}
          <Link
            to={"/gio-hang"}
            className="relative flex flex-col items-center hover:text-textPrimary transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Giỏ hàng</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              1
            </span>
          </Link>
        </div>
      </div>

      {/* Dialog Danh Mục */}
      {isCategoryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Danh mục</h2>
              <button onClick={() => setIsCategoryOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Danh sách danh mục */}
            <div className="flex-1 overflow-y-auto p-4">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/san-pham?danh-muc=${category.slug}`}
                    className="block p-3 border-b border-gray-200 hover:bg-gray-100"
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  Không có danh mục nào.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomMenu;
