import { Button } from '@/components/common/Button';
import { faShoppingCart, faTrash, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const OderForm = () => {
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
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-gray-400">
                        <FontAwesomeIcon icon={faTruck} className="w-6 text-gray-400" />
                    </span>
                    <span className="mt-2 text-sm md:text-base">Hoàn tất đặt hàng</span>
                </li>
            </ul>

            {/* Form */}
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                <form className="space-y-6" id="form_info_order" name="form_info_order" method="post">
                    {/* Hidden Inputs */}
                    <input type="hidden" name="code_order" id="code_order" />
                    <input type="hidden" name="code_price_sale" id="code_price_sale" />

                    {/* Customer Info */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Thông tin khách hàng</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                id="full_name_order"
                                name="full_name_order"
                                placeholder="Họ và tên *"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                id="phone_number_order"
                                name="phone_number_order"
                                placeholder="Số điện thoại *"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                id="email_order"
                                name="email_order"
                                placeholder="Email *"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div id="method_order_1" className="space-y-4">
                        <select
                            name="province"
                            id="province"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Chọn Tỉnh / Thành Phố</option>
                            <option value="01">Thành Phố Hà Nội</option>
                            <option value="48">Thành Phố Đà Nẵng</option>
                            <option value="79">Thành Phố Hồ Chí Minh</option>
                        </select>

                        <select
                            name="district"
                            id="district"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Chọn Quận / Huyện</option>
                        </select>

                        <select
                            name="wards"
                            id="wards"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Chọn Phường / Xã</option>
                        </select>

                        <input
                            type="text"
                            id="address_order"
                            name="address_order"
                            placeholder="Số nhà / tên đường"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Other Requirements */}
                    <textarea
                        name="other_requirement_order"
                        id="other_requirement_order"
                        placeholder="Yêu cầu khác..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>

                    {/* Payment Method */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Hình thức thanh toán</label>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="method_payment"
                                    value="store"
                                    id="method_payment_store"
                                    className="mr-2"
                                    defaultChecked
                                />
                                <label htmlFor="method_payment_store">Thanh toán tại cửa hàng</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="method_payment"
                                    value="delivery"
                                    id="method_payment_delivery"
                                    className="mr-2"
                                />
                                <label htmlFor="method_payment_delivery">Thanh toán khi nhận hàng</label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            id="button_confirm_order"
                            name="button_confirm_order"
                            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                        >
                            Xác nhận đặt hàng
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
