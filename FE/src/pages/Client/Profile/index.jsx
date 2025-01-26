import { useState } from "react";
import { useEffect } from "react";
import { AddressList } from "@/components/Client/Profile/addressList";
import { Information } from "@/components/Client/Profile/information";
import { OrderTabs } from "@/components/Client/Profile/oders";
import {
  faBox,
  faLocationDot,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMe, changeProfile, changePassword } from "@/services/auth";
import { getOrdersByUserId } from "@/services/order";
import { getToken, isTokenValid, decodeToken, removeToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders"); // Tab mặc định
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async (token, userId) => {
      const [userData, orderData] = await Promise.all([
        getMe(token),
        getOrdersByUserId(userId),
      ]);
      if (userData) setUser(userData);
      if (orderData) setOrders(orderData);
    };

    const token = getToken();
    if (isTokenValid(token)) {
      const userDecode = decodeToken(token);
      fetchData(token, userDecode.id);
    }
  }, []);

  return (
    <div className="container py-5 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Sidebar */}
      <div className="md:col-span-1 col-span-1">
        <div className="bg-white p-4 rounded-lg">
          <div
            className="flex justify-start items-center gap-4"
            onClick={() => setActiveTab("profile")}
          >
            <img
              src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
              className="size-12 rounded-full"
              alt="Avatar"
            />
            <div>
              <h3 className="text-md font-semibold">Đinh Phương Nhã</h3>
              <p className="text-gray-500 text-sm">Thông tin cá nhân</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg mt-2 py-2">
          <div
            className={`flex justify-start items-center gap-4 p-4 transition-all duration-200 ease-in-out 
                        ${activeTab === "orders" ? "hover:bg-gray-100 border-l-2 border-primary text-primary" : "hover:ps-6 hover:bg-gray-100 hover:border-l-2 "}`}
            onClick={() => setActiveTab("orders")}
          >
            <FontAwesomeIcon icon={faBox} />
            <p className="text-md">Thông tin đơn hàng</p>
          </div>
          <div
            className={`flex justify-start items-center gap-4 p-4 transition-all duration-200 ease-in-out 
                        ${activeTab === "addresses" ? "hover:bg-gray-100 border-l-2 border-primary text-primary" : "hover:ps-6 hover:bg-gray-100 hover:border-l-2 "}`}
            onClick={() => setActiveTab("addresses")}
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="text-md">Sổ địa chỉ nhận hàng</p>
          </div>
          <div
            className={`flex justify-start items-center gap-4 p-4 transition-all duration-200 ease-in-out 
                        ${activeTab === "logout" ? "hover:bg-gray-100 border-l-2 border-primary text-primary" : "hover:ps-6 hover:bg-gray-100 hover:border-l-2 "}`}
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p className="text-md">Đăng xuất</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-3 col-span-1">
        <div className="bg-white p-4 rounded-lg">
          {activeTab === "profile" && <Information />}
          {activeTab === "orders" && <OrderTabs />}
          {activeTab === "addresses" && <AddressList />}
        </div>
      </div>
    </div>
  );
};
