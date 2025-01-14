import React, { useState } from 'react';

export const OrderTabs = () => {
    const [activeTab, setActiveTab] = useState('processing'); // Tab mặc định

    // Dữ liệu mẫu
    const orders = {
        processing: [
            { id: 1, name: 'Đơn hàng 1', date: '14/01/2025', total: '500.000đ' },
            { id: 2, name: 'Đơn hàng 2', date: '13/01/2025', total: '300.000đ' },
        ],
        delivering: [
            { id: 3, name: 'Đơn hàng 3', date: '12/01/2025', total: '700.000đ' },
        ],
        delivered: [
            { id: 4, name: 'Đơn hàng 4', date: '10/01/2025', total: '1.000.000đ' },
        ],
        canceled: [
            { id: 5, name: 'Đơn hàng 5', date: '08/01/2025', total: '200.000đ' },
        ],
    };

    return (
        <div>
            {/* Tabs */}
            <div className="flex border-b mb-4">
                <button
                    className={`py-2 px-4 ${
                        activeTab === 'processing'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-gray-500 hover:text-primary'
                    }`}
                    onClick={() => setActiveTab('processing')}
                >
                    Đang xử lý
                </button>
                <button
                    className={`py-2 px-4 ${
                        activeTab === 'delivering'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-gray-500 hover:text-primary'
                    }`}
                    onClick={() => setActiveTab('delivering')}
                >
                    Đơn đang giao
                </button>
                <button
                    className={`py-2 px-4 ${
                        activeTab === 'delivered'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-gray-500 hover:text-primary'
                    }`}
                    onClick={() => setActiveTab('delivered')}
                >
                    Đơn đã giao
                </button>
                <button
                    className={`py-2 px-4 ${
                        activeTab === 'canceled'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-gray-500 hover:text-primary'
                    }`}
                    onClick={() => setActiveTab('canceled')}
                >
                    Đơn đã hủy
                </button>
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
                                <h3 className="text-lg text-primary font-semibold">{order.name}</h3>
                                <p className="text-gray-600">Ngày đặt: {order.date}</p>
                                <p className="text-gray-600">Tổng tiền: {order.total}</p>
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
