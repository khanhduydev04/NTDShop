import { Home, Menu, Search, ShoppingCart, User } from "lucide-react";

const BottomMenu = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md shadow-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2 text-xs text-gray-600 hover:text-textPrimary">
        {/* Trang chủ */}
        <div className="flex flex-col items-center">
          <Home className="w-6 h-6" />
          <span>Trang chủ</span>
        </div>

        {/* Danh mục */}
        <div className="flex flex-col items-center">
          <Menu className="w-6 h-6" />
          <span>Danh mục</span>
        </div>

        {/* Tìm kiếm */}
        <div className="flex flex-col items-center">
          <Search className="w-6 h-6" />
          <span>Tìm kiếm</span>
        </div>

        {/* Đăng nhập */}
        <div className="flex flex-col items-center">
          <User className="w-6 h-6" />
          <span>Đăng nhập</span>
        </div>

        {/* Giỏ hàng */}
        <div className="relative flex flex-col items-center">
          <ShoppingCart className="w-6 h-6" />
          <span>Giỏ hàng</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            1
          </span>
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
