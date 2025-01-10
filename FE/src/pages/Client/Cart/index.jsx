import { Button } from '@/components/common/Button';
import { faShoppingCart, faTrash, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CartPage = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Macbook Air M2 13inch 8GB 256GB | New',
            price: 19890000,
            quantity: 1,
            image: 'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-11.jpg',
        },
        {
            id: 2,
            name: 'iPhone 14 Pro Max 128GB',
            price: 29990000,
            quantity: 1,
            image: 'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-11.jpg',
        },
        {
            id: 3,
            name: 'Apple Watch Series 8',
            price: 9990000,
            quantity: 1,
            image: 'https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-11.jpg',
        },
    ]);

    const handleIncrement = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

    const handleDecrement = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    const handleDelete = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    const totalPrice = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

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
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-gray-400">
                        <FontAwesomeIcon icon={faUser} className="w-6 text-gray-400" />
                    </span>
                    <span className="mt-2 text-sm md:text-base">Thông tin đặt hàng</span>
                </li>
                <li className="flex flex-col items-center text-center relative step-item">
                    <span className="h-12 w-12 flex justify-center items-center rounded-full border border-gray-400">
                        <FontAwesomeIcon icon={faTruck} className="w-6 text-gray-400" />
                    </span>
                    <span className="mt-2 text-sm md:text-base">Hoàn tất đặt hàng</span>
                </li>
            </ul>

            {/* Product List */}
            <div className="w-full flex justify-center items-center py-6">
                <div className="grid justify-center items-center gap-6 w-full lg:w-3/4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg p-4 shadow-md flex flex-col sm:flex-row gap-4"
                        >
                            {/* Product Image */}
                            <div className="w-24 h-24 flex-shrink-0">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="info-product-shopping flex-grow">
                                <div className="name-product-shopping font-semibold text-lg">
                                    {product.name}
                                </div>
                                <div className="price-product-shopping my-2 text-gray-700">
                                    Giá: <strong className="text-red-500">{product.price.toLocaleString()} ₫</strong>
                                </div>
                                <div className="total-product-shopping my-2 text-gray-700">
                                    Tổng tiền:
                                    <strong className="text-red-500 ml-2">
                                        {(product.price * product.quantity).toLocaleString()} ₫
                                    </strong>
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                                <button
                                    className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                                    onClick={() => handleDecrement(product.id)}
                                >
                                    -
                                </button>
                                <strong className="mx-4 sm:mx-2">{product.quantity}</strong>
                                <button
                                    className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
                                    onClick={() => handleIncrement(product.id)}
                                >
                                    +
                                </button>
                            </div>

                            {/* Delete Button */}
                            <div className="flex justify-end items-center sm:justify-start">
                                <button
                                    className="flex justify-center items-center text-red-500 w-10 h-10 p-4 border rounded-lg hover:text-red-700"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Total Price and Checkout */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-6">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                            <p className="text-lg font-medium text-gray-600">Tổng tiền:</p>
                            <p className="text-xl font-bold text-red-500">{totalPrice.toLocaleString()} VND</p>
                        </div>
                        <Button bg="primary" className="w-full sm:w-auto px-6 py-2">
                            Tiến hành đặt hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
