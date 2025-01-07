import { faShoppingCart, faTruck, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
    return (
        <div className="box-ordering-steps p-4 max-w-screen-lg mx-auto">
            {/* Back Button */}
            <Link
                to="/"
                className="button-comeback flex items-center cursor-pointer mb-4"
            >
                <span className="flex items-center text-primary">
                    <i className="icon-back mr-2"></i> Quay lại
                </span>
            </Link>

            {/* Title */}
            <div className="title-shopping-cart mb-8 text-center">
                <h1 className="text-2xl font-bold text-primary">Chọn sản phẩm</h1>
            </div>

            {/* Steps */}
            <ul className="flex justify-center items-center md:gap-20 mb-8">
                <li className="flex flex-col items-center text-center relative step-item">
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-primary">
                        <FontAwesomeIcon icon={faShoppingCart} className="w-6 text-primary" />
                    </span>
                    <span className="mt-2 text-sm md:text-base text-primary">Chọn sản phẩm</span>
                </li>
                <li className="flex flex-col items-center text-center relative step-item">
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-primary">
                        <FontAwesomeIcon icon={faUser} className="w-6  text-primary" />
                    </span>
                    <span className="mt-2 text-sm md:text-base text-primary">Thông tin đặt hàng</span>
                </li>
                <li className="flex flex-col items-center text-center relative step-item">
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-primary">
                        <FontAwesomeIcon icon={faTruck} className="w-6 text-primary" />
                    </span>
                    <span className="mt-2 text-sm md:text-base text-primary">Hoàn tất đặt hàng</span>
                </li>
            </ul>

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
                <p className="text-gray-700 text-base">
                    Cảm ơn Quý khách hàng đã chọn mua hàng tại T&amp;T Center. Trong 15 phút, T&amp;T Center sẽ gửi SMS hoặc gọi để xác nhận đơn hàng.
                </p>
                <p className="text-gray-700 text-sm mt-2">
                    * Các đơn hàng từ 21h30 tối tới 8h sáng hôm sau. T&amp;T Center sẽ liên hệ với Quý khách trước 10h trưa cùng ngày.
                </p>
                <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold text-primary">Đặt hàng thành công</h2>
                </div>
                <div className="mt-6 space-y-3 border border-2 border-primary p-4 rounded-lg">
                    <p className="text-gray-800">
                        Người đặt: <strong className="font-medium">ho tran</strong>
                    </p>
                    <p className="text-gray-800">
                        Số Điện Thoại: <strong className="font-medium">0912022074</strong>
                    </p>
                    <p className="text-gray-800">
                        Email: <strong className="font-medium">tranhdmpc@gmail.com</strong>
                    </p>
                    <p className="text-gray-800">
                        Địa chỉ: <strong className="font-medium">478 Lê Hồng Phong, Quận 10, TP.HCM</strong>
                    </p>
                    <p className="text-gray-800">
                        Hình thức thanh toán: <strong className="font-medium">Thanh toán tại cửa hàng</strong>
                    </p>
                    <p className="text-gray-800">
                        Tổng Tiền thanh toán: <strong className="font-medium text-red-600">11.890.000 ₫</strong>
                    </p>
                </div>
                <div className="mt-8 text-center">
                    <a
                        href="https://ttcenter.com.vn"
                        rel="nofollow"
                        className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition duration-300"
                    >
                        Tiếp tục mua hàng
                    </a>
                </div>
            </div>

        </div>
    );
};

export default OrderConfirmation;
