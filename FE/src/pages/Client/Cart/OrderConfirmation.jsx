import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faTruck } from '@fortawesome/free-solid-svg-icons';
import { getOrderById } from '@/services/order';
import { Button } from '@/components/common/Button';

const OrderConfirmation = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getOrderById(id);
                setOrder(response);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    if (loading) {
        return <div className="text-center text-gray-500">Đang tải...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Lỗi: {error}</div>;
    }

    if (!order) {
        return <div className="text-center text-red-500">Không tìm thấy đơn hàng</div>;
    }

    const totalPrice = order.orderDetails.reduce((total, detail) => total + detail.price * detail.quantity, 0) + order.deliveryCost;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-center text-primary mb-6">Xác nhận đơn hàng</h1>
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                {[faShoppingCart, faUser, faTruck].map((icon, index) => (
                    <div key={index} className="flex flex-col items-center text-gray-600">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full border border-primary mb-2">
                            <FontAwesomeIcon icon={icon} className="text-primary w-6" />
                        </div>
                        <span className="text-sm">{index === 0 ? "Chọn sản phẩm" : index === 1 ? "Thông tin đặt hàng" : "Hoàn tất"}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-primary mb-6">
                <h3 className="text-xl font-semibold text-primary text-center mb-4">Chi tiết đơn hàng</h3>
                <div className="mb-4">
                    <p><span className='font-semibold'>Mã đơn hàng:</span> {order.id}</p>
                    <p><span className='font-semibold'>Ngày đặt hàng:</span> {new Date(order.dateOrder).toLocaleDateString()}</p>
                    <p><span className='font-semibold'>Ngày nhận hàng dự ki:</span> {new Date(order.dateReceive).toLocaleDateString()}</p>
                    <p><span className='font-semibold'>Trạng thái:</span> {order.status}</p>
                    <p><span className='font-semibold'>Phương thức thanh toán:</span> {order.paymentMethod}</p>
                    <p><span className='font-semibold'>Tình trạng thanh toán:</span> {order.paymentStatus}</p>
                </div>
                <div className="mb-4">
                    <h4 className="font-semibold mb-2">Sản phẩm</h4>
                    {order.orderDetails.map((detail, index) => (
                        <div key={index} className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <img src={detail.productVariant.product.thumbnail} alt={detail.productVariant.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                <div>
                                    <p className="font-semibold">{detail.productVariant.product.name}</p>
                                    <p className="text-sm">Màu sắc: {detail.productVariant.color}</p>
                                    <p className="text-sm">Dung lượng: {detail.productVariant.storage}</p>
                                </div>
                            </div>
                            <p className="text-sm">{detail.quantity} x {detail.price.toLocaleString()} ₫</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center font-semibold mt-3">
                    <p>Phí vận chuyển:</p>
                    <p>{order.deliveryCost.toLocaleString()} ₫</p>
                </div>
                <div className="flex justify-between items-center font-semibold mt-4">
                    <p>Tổng cộng:</p>
                    <p className="text-red-500">{totalPrice.toLocaleString()} ₫</p>
                </div>
                <div className="w-full text-center mt-6">
                    <Link to={'/'}>
                        <Button bgColor='primary-sm'>
                            Tiếp tục mua hàng
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
