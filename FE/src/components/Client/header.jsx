import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "@/hooks/useDebounce";
import { searchProducts } from "@/services/product";
import {
  AlignJustify,
  Home,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { getCategories } from "@/services/category";
import { getToken, removeToken, decodeToken, isTokenValid } from "@/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/store/cartSlice"; 

export const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500); // Trì hoãn 500ms
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) {
      const decoded = decodeToken(token);
      if (decoded && decoded.username) {
        setUsername(decoded.username);
      }
    } else {
      setUsername("");
      removeToken();
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result || []);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedKeyword.trim()) {
        const result = await searchProducts({ keyword: debouncedKeyword });
        setSuggestions(result || []);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedKeyword]);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch(setCart(cart)); // Đồng bộ giỏ hàng với Redux
    };

    window.addEventListener("cartUpdated", updateCartCount);
    updateCartCount(); // Cập nhật ngay khi component mount

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/san-pham?ten=${encodeURIComponent(keyword)}`);
      setIsDialogOpen(false);
      setIsSearchOpen(false);
    }
  };


  const handleLogout = () => {
    removeToken();
    setUsername("");
  };

    return (
    <>
      <header className="bg-primary shadow-lg lg:fixed top-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between py-5">
          {/* Logo */}
          <div className="logo">
            <Link to="/" title="T&T Center">
              <img
                src="https://ttcenter.com.vn/images/logo.svg"
                alt="T&T Center"
                title="T&T Center"
                className="w-32 md:w-48"
              />
            </Link>
          </div>

          {/* Categories */}
          <div className="group relative hidden lg:block">
            <button
              className="bg-white/10 group-hover:bg-[#3FB4F5] px-4 py-2.5 rounded-full flex items-center gap-2 leading-5"
              aria-label="Danh mục"
            >
              <AlignJustify strokeWidth={1.5} className="size-5" />
              <span>Danh mục</span>
            </button>

            {/* Menu danh mục */}
            <div className="absolute top-[110%] left-0 bg-white shadow-md overflow-hidden rounded-md w-64 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className="hover:bg-gray-100 text-textBlack">
                    <Link
                      to={`/san-pham?danh-muc=${category.slug}`}
                      className="block px-4 py-2"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Search */}
          <div className="menu_search hidden lg:flex items-center relative">
            <form
              className="flex relative w-40 md:w-80 rounded-full overflow-hidden bg-white"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                name="ten"
                id="search_product"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setIsDialogOpen(true); // Mở dialog khi nhập liệu
                }}
                placeholder="Nhập tên sản phẩm cần tìm ..."
                className="px-3 py-2 flex-1 focus:outline-none text-textBlack"
              />
              <button
                type="submit" // Chuyển sang trang khi nhấn nút
                className="text-textPrimary p-2 pr-3"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>

            {/* Dialog */}
            {isDialogOpen && suggestions.length > 0 && (
              <div className="absolute top-[110%] left-0 w-full bg-white border rounded-md shadow-lg z-10 overflow-hidden">
                <ul>
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setIsDialogOpen(false); // Đóng dialog
                      }}
                    >
                      <Link to={`/san-pham/${product.slug}`} className="block">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 mr-4"
                          />
                          <div>
                            <p className="font-medium text-textBlack">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Giá: {product.price.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Hotline */}
          <div className="menu_hotline hidden xl:flex items-center cursor-pointer">
            <a
              href="tel:0898.143.789"
              title="Hotline CSKH"
              className="flex items-center"
            >
              <img
                src="https://ttcenter.com.vn/images/hotline.svg"
                alt="hotline"
                title="hotline"
                className="w-6 h-6 mr-2"
              />
              <div>
                <p className="text-sm">Hotline CSKH</p>
                <p>
                  <strong>0898.143.789</strong>
                </p>
              </div>
            </a>
          </div>

          {/* Cart */}
          <div className="menu_cart hidden lg:flex items-center bg-[#3FB4F5] px-4 py-2.5 rounded-full">
            <Link to="gio-hang" title="Giỏ hàng" className="flex items-center">
              <img
                src="https://ttcenter.com.vn/images/cart.svg"
                alt="Giỏ hàng"
                title="Giỏ hàng"
                className="size-5 mr-2"
              />
              <span>
                Giỏ hàng <strong className="number_cart">{cartCount}</strong>
              </span>
            </Link>
          </div>

          {/* Account */}
          <div className="relative hidden lg:block">
            {username ? (
              <div className="group flex items-center">
                <div className="cursor-pointer flex items-center bg-white/10 px-4 py-2.5 rounded-full">
                  <img
                    src="https://ttcenter.com.vn/images/user.svg"
                    alt="user"
                    className="w-6 h-6 mr-2"
                  />
                  <span>{username}</span>
                </div>
                <div className="absolute right-0 top-[110%] w-48 bg-white rounded-md overflow-hidden transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible shadow-lg z-10">
                  <Link
                    to="/thong-tin-ca-nhan"
                    className="block text-textBlack px-4 py-2 hover:bg-gray-100"
                  >
                    Trang cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-textBlack w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="menu_account hidden lg:flex items-center bg-white/10 px-4 py-2.5 rounded-full">
                <Link
                  to="/dang-nhap"
                  title="Đăng nhập"
                  className="flex items-center"
                >
                  <img
                    src="https://ttcenter.com.vn/images/user.svg"
                    alt="user"
                    title="user"
                    className="w-6 h-6 mr-2"
                  />
                  <span>Đăng nhập</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <div
            className={`lg:hidden hover:text-textPrimary transition-colors cursor-pointer ${
              isSearchOpen ? "text-textPrimary" : ""
            }`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-6 h-6" />
          </div>
        </div>
      </header>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md shadow-white border-t border-gray-200 z-[99]">
        <div className="flex justify-around items-center py-2 text-xs text-gray-600">
          <Link
            to={"/"}
            className={`flex flex-col items-center hover:text-textPrimary transition-colors ${
              location.pathname === "/" ? "text-textPrimary" : ""
            }`}
          >
            <Home className="w-6 h-6" />
            <span>Trang chủ</span>
          </Link>

          {/* Danh mục */}
          <div
            className={`flex flex-col items-center hover:text-textPrimary transition-colors cursor-pointer ${
              isCategoryOpen ? "text-textPrimary" : ""
            }`}
            onClick={() => setIsCategoryOpen(true)}
          >
            <Menu className="w-6 h-6" />
            <span>Danh mục</span>
          </div>

          {/* Tìm kiếm */}
          <div
            className={`flex flex-col items-center hover:text-textPrimary transition-colors cursor-pointer ${
              isSearchOpen ? "text-textPrimary" : ""
            }`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-6 h-6" />
            <span>Tìm kiếm</span>
          </div>

          {/* Đăng nhập */}
          <Link
            to={username ? "/thong-tin-ca-nhan" : "/dang-nhap"}
            className={`flex flex-col items-center hover:text-textPrimary transition-colors ${
              location.pathname === "/thong-tin-ca-nhan" ||
              location.pathname === "/dang-nhap"
                ? "text-textPrimary"
                : ""
            }`}
          >
            <User className="w-6 h-6" />
            <span>{username ? "Tài khoản" : "Đăng nhập"}</span>
          </Link>

          {/* Giỏ hàng */}
          <Link
            to={"/gio-hang"}
            className={`relative flex flex-col items-center hover:text-textPrimary transition-colors ${
              location.pathname === "/gio-hang" ? "text-textPrimary" : ""
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Giỏ hàng</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              {cartCount}
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

      {/* Dialog Tìm kiếm */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white/50 flex justify-center items-start z-20">
          <div className="bg-white w-full max-w-3xl p-3 shadow-lg relative">
            <div className="flex items-center gap-2 w-full">
              <button className="" onClick={() => setIsSearchOpen(false)}>
                <X className="w-6 h-6" />
              </button>
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-1 items-center border-b border-gray-300 p-2"
              >
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Nhập tên sản phẩm cần tìm..."
                  className="flex-1 p-2 outline-none"
                />
                <button type="submit">
                  <Search className="w-6 h-6 text-gray-600" />
                </button>
              </form>
            </div>
            <div className="mt-3">
              {suggestions.length > 0 && (
                <ul className="rounded-md overflow-hidden">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setIsSearchOpen(false);
                      }}
                    >
                      <Link to={`/san-pham/${product.slug}`} className="block">
                        <div className="flex items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 mr-4"
                          />
                          <div>
                            <p className="font-medium text-textBlack">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Giá: {product.price.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
