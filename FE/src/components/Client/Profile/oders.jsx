import React, { useState, useEffect } from 'react';
import { getOrdersByUserId } from '@/services/order';
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode';

export const OrderTabs = () => {
    const [activeTab, setActiveTab] = useState('Đã đặt hàng');
    const [orders, setOrders] = useState({
        'Đã đặt hàng': [],
        'Đang vận chuyển': [],
        'Đã giao hàng': [],
        'Đã hủy': []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = getToken();
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const allOrders = await getOrdersByUserId(userId);
                const categorizedOrders = {
                    'Đã đặt hàng': allOrders.filter(order => order.status === 'Đã đặt hàng'),
                    'Đang vận chuyển': allOrders.filter(order => order.status === 'Đang vận chuyển'),
                    'Đã giao hàng': allOrders.filter(order => order.status === 'Đã giao hàng'),
                    'Đã hủy': allOrders.filter(order => order.status === 'Đã hủy')
                };
                setOrders(categorizedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    const calculateTotalPrice = (order) => {
        return order.orderDetails.reduce((total, detail) => total + (detail.price * detail.quantity), 0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Tabs */}
            <div className="flex border-b mb-4">
                {Object.keys(orders).map((status) => (
                    <button
                        key={status}
                        className={`py-2 px-4 ${activeTab === status ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
                        onClick={() => setActiveTab(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {orders[activeTab]?.length > 0 ? (
                    <div className="space-y-4">
                        {orders[activeTab].map((order) => (
                            <div
                                key={order.id}
                                className="p-4 border border-primary rounded-lg hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-lg text-primary font-semibold">Mã đơn hàng: {order.id}</h3>
                                <p className="text-gray-600">Ngày đặt: {order.dateOrder}</p>
                                <p className="text-gray-600">Tổng tiền: {calculateTotalPrice(order).toLocaleString()} VND</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Không có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};