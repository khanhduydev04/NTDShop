import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faShoppingCart, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDefaultAddressForOrder } from '@/services/address';
import { getToken, isTokenValid } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode';
import { createOrder } from '@/services/order';
import { Button } from '@/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/store/cartSlice';
import { getProductsFilterCart } from '@/services/product';

export const OderForm = () => {
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [userId, setUserId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [detailedProducts, setDetailedProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.items);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const token = getToken();
                if (token && isTokenValid(token)) { 
                    const decoded = jwtDecode(token);
                    console.log(decoded.id);
                    setUserId(decoded.id);
                } else {
                    navigate('/dang-nhap');
                }
            } catch (error) {
                console.error("Lỗi khi giải mã token:", error);
            }
        };
    
        initializeUser();
    }, []);

    useEffect(() => {
        const fetchDefaultAddress = async () => {
            if (!userId) return;
            try {
                const address = await getDefaultAddressForOrder(userId);
                setDefaultAddress(address);
            } catch (error) {
                console.error("Lỗi khi lấy địa chỉ mặc định:", error);
            }
        };

        fetchDefaultAddress();
    }, [userId]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const productIds = cartProducts.map(item => item.id);
            if (productIds.length === 0) {
                setLoading(false);
                return;
            }
            const products = await getProductsFilterCart({ ids: productIds });

            const productsWithQuantity = products.map(product => {
                const cartItem = cartProducts.find(item => item.id === product.id);
                if (cartItem) {
                    return { ...product, quantity: cartItem.quantity };
                }
                return null;
            }).filter(product => product !== null);

            setDetailedProducts(productsWithQuantity);
            setLoading(false);
            calculateTotalPrice(productsWithQuantity);
        };

        fetchCartProducts();
    }, [cartProducts]);

    const calculateTotalPrice = (products) => {
        const total = products.reduce((sum, product) => {
            const variant = product.productVariants && product.productVariants[0];
            const price = variant ? variant.price : 0;
            const quantity = product.quantity || 0;
            return sum + (price * quantity);
        }, 0);
        setTotalPrice(total);
    };

    const handleConfirmOrder = async (event) => {
        event.preventDefault();
        const orderData = {
            dateOrder: new Date().toISOString().split('T')[0],
            dateReceive: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
            deliveryCost: 50000,
            paymentStatus: "Chưa thanh toán",
            status: "Đã đặt hàng",
            isActive: true,
            addressId: defaultAddress?.id,
            paymentMethod: "COD",
            customerId: userId,
            orderDetails: detailedProducts.map(product => ({
                productVariantId: product.productVariants[0]?.id,
                quantity: product.quantity,
                price: product.productVariants[0]?.price,
            }))
        };

        try {
            const createdOrder = await createOrder(orderData);

            if (createdOrder) {
                toast.success("🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
                dispatch(clearCart());
                setTotalPrice(0);

                const event = new Event('cartUpdated');
                window.dispatchEvent(event);

                setTimeout(() => {
                    navigate(`/xac-nhan-dat-hang/${createdOrder.id}`);
                }, 2000);
            }
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <div className="box-ordering-steps pb-10 max-w-screen-lg mx-auto">
            {/* Back Button */}
            <Link to="/" className="button-comeback flex items-center cursor-pointer">
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

            <div className="max-w-3xl mx-auto">
                {/* Address Section */}
                <div className="bg-white shadow-sm rounded-md p-6 mb-2">
                    <label className="block text-lg font-semibold mb-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-primary" />
                        Địa chỉ nhận hàng
                    </label>
                    <div className="flex justify-between items-center">
                        {defaultAddress ? (
                            <>
                                <p className='font-semibold'>{defaultAddress.name} - {defaultAddress.phone}</p>
                                <p>{defaultAddress.fullAddress} <span className='text-red-500 text-sm'>(Mặc định)</span></p>
                            </>
                        ) : (
                            <p>Không có địa chỉ mặc định nào được thiết lập.</p>
                        )}
                        <Link to="/thong-tin-ca-nhan" state={{ activeTab: "addresses" }}>
                            <Button bgColor="text">Thay đổi</Button>
                        </Link>
                    </div>
                </div>

                {/* Products Section */}
                <div className="bg-white shadow-sm rounded-md p-6 mb-2">
                    <div className="mt-4">
                        {loading ? (
                            <div>Đang tải sản phẩm...</div>
                        ) : detailedProducts.length > 0 ? (
                            detailedProducts.map((product, index) => (
                                <div key={index} className="flex justify-between items-center border p-4 rounded-md mb-2">
                                    <div className="flex items-center">
                                        {/* Lấy ảnh đầu tiên trong mảng productImages */}
                                        <img
                                            src={product.productImages && product.productImages[0]?.imageUrl} // Lấy đường dẫn ảnh từ phần tử đầu tiên trong mảng
                                            alt={product.name}
                                            className="w-16 h-16 object-cover mr-4"
                                        />
                                        <div>
                                            <p className="font-semibold">{product.name}</p>
                                            <p>
                                                {product.productVariants && product.productVariants[0]?.price.toLocaleString()} ₫ x {product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">
                                        {product.productVariants && product.productVariants[0] ? (product.productVariants[0].price * product.quantity).toLocaleString() : '0'} ₫
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Không có sản phẩm nào trong giỏ hàng.</p>
                        )}
                    </div>
                </div>
                {/* Hiển thị tổng giá */}
                <div className="w-full flex justify-between items-center mt-8">
                    <p className="font-semibold">Tổng cộng: <span className='text-red-500 font-bold'>{totalPrice.toLocaleString()} ₫</span></p>
                    <Button bgColor="primary" onClick={handleConfirmOrder}>
                        Xác nhận đơn hàng
                    </Button>
                </div>
            </div>



            <ToastContainer />
        </div>
    );
};

export default OderForm;
