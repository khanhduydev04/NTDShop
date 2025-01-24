import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useDebounce from "@/hooks/useDebounce";
import { searchProducts } from "@/services/product";

export const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 500); // Delay 500ms
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedKeyword) {
        const result = await searchProducts({ keyword: debouncedKeyword });
        setSuggestions(result || []);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedKeyword]);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (keyword.trim()) {
      navigate(`/san-pham?ten=${encodeURIComponent(keyword)}`);
      setIsDialogOpen(false); // Đóng dialog
    }
  };

  return (
    <header className="bg-primary shadow-lg lg:fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-6">
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

        {/* Search */}
        <div className="menu_search hidden lg:flex items-center relative">
          <form
            className="flex"
            onSubmit={handleSearchSubmit} // Xử lý sự kiện submit
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
              className="border p-2 rounded-l-md w-40 md:w-80 focus:outline-none text-textBlack"
            />
            <button
              type="submit" // Chuyển sang trang khi nhấn nút
              className="bg-blue-500 text-white p-2 rounded-r-md"
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
                      // navigate(`/san-pham/${product.slug}`);
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
        <div className="menu_hotline hidden lg:flex items-center cursor-pointer">
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
        <div className="menu_cart hidden lg:flex items-center">
          <Link to="#" title="Giỏ hàng" className="flex items-center">
            <img
              src="https://ttcenter.com.vn/images/cart.svg"
              alt="Giỏ hàng"
              title="Giỏ hàng"
              className="w-6 h-6 mr-2"
            />
            <span>
              Giỏ hàng <strong className="number_cart">0</strong>
            </span>
          </Link>
        </div>

        {/* Account */}
        <div className="menu_account hidden lg:flex items-center">
          <Link to="/dang-nhap" title="Đăng nhập" className="flex items-center">
            <img
              src="https://ttcenter.com.vn/images/user.svg"
              alt="user"
              title="user"
              className="w-6 h-6 mr-2"
            />
            <span>Đăng nhập</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
