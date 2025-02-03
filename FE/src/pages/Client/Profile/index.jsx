import { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy state từ điều hướng
  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState({});

  // Khi trang load, kiểm tra xem có state activeTab được truyền vào hay không
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async (token, userId) => {
      try {
        const [userData, orderData] = await Promise.all([
          getMe(token),
        ]);
        if (userData) setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const token = getToken();
    if (isTokenValid(token)) {
      const userDecode = decodeToken(token);
      fetchData(token, userDecode.id);
    } else {
      console.log("Token không hợp lệ hoặc hết hạn.");
    }
  }, []);

  return (
    <div className="container py-5 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Sidebar */}
      <div className="md:col-span-1 col-span-1">
        <div className="bg-white p-4 rounded-lg">
          <div
            className="flex justify-start items-center gap-4 cursor-pointer"
            onClick={() => setActiveTab("profile")}
          >
            <img
              src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
              className="size-12 rounded-full"
              alt="Avatar"
            />
            <div>
              <h3 className="text-md font-semibold">{user.fullName}</h3>
              <p className="text-gray-500 text-sm">Thông tin cá nhân</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg mt-2 py-2">
          {/* Tab Đơn Hàng */}
          <div
            className={`flex justify-start items-center gap-4 p-4 cursor-pointer 
                        ${activeTab === "orders" ? "bg-gray-100 border-l-4 border-primary text-primary" : "hover:bg-gray-100 hover:border-l-2 "}`}
            onClick={() => setActiveTab("orders")}
          >
            <FontAwesomeIcon icon={faBox} />
            <p className="text-md">Thông tin đơn hàng</p>
          </div>

          {/* Tab Địa Chỉ */}
          <div
            className={`flex justify-start items-center gap-4 p-4 cursor-pointer 
                        ${activeTab === "addresses" ? "bg-gray-100 border-l-4 border-primary text-primary" : "hover:bg-gray-100 hover:border-l-2 "}`}
            onClick={() => setActiveTab("addresses")}
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="text-md">Sổ địa chỉ nhận hàng</p>
          </div>

          {/* Đăng xuất */}
          <div
            className={`flex justify-start items-center gap-4 p-4 cursor-pointer 
                        hover:bg-gray-100 hover:border-l-2`}
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p className="text-md">Đăng xuất</p>
          </div>
        </div>
      </div>

      {/* Nội dung Tab */}
      <div className="md:col-span-3 col-span-1">
        <div className="bg-white p-4 rounded-lg">
          {activeTab === "profile" && <Information user={user} />}
          {activeTab === "orders" && <OrderTabs />}
          {activeTab === "addresses" && <AddressList />}
        </div>
      </div>
    </div>
  );
};
