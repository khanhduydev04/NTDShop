import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    getAllAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from '@/services/address';
import { getToken } from '@/utils/auth';
import { jwtDecode } from 'jwt-decode';

export const AddressList = () => {
    const [userId, setUserId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        fullAddress: '',
        default: false,
    });
    const [editingAddress, setEditingAddress] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const token = getToken();
                if (token) {
                    const decoded = jwtDecode(token);
                    setUserId(decoded.id);
                }
            } catch (error) {
                console.error("Lỗi khi giải mã token:", error);
            }
        };

        initializeUser();
    }, []);

    const fetchAddresses = async () => {
        if (!userId) return;
        try {
            const data = await getAllAddresses(userId);
            setAddresses(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách địa chỉ:", error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [userId]);

    const handleEdit = (address) => {
        setEditingAddress(address);
        setNewAddress({
            name: address.name || '',
            phone: address.phone || '',
            fullAddress: address.fullAddress || '',
            default: address.default || false,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            try {
                await deleteAddress(id);
                fetchAddresses();
            } catch (error) {
                console.error("Lỗi khi xóa địa chỉ:", error);
            }
        }
    };

    const handleSaveAddress = async () => {
        if (!newAddress.name || !newAddress.phone || !newAddress.fullAddress) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            const addressData = {
                name: newAddress.name,
                fullAddress: newAddress.fullAddress,
                phone: newAddress.phone,
                userId,
            };

            if (editingAddress) {
                await updateAddress(editingAddress.id, addressData);
            } else {
                await createAddress(addressData);
            }

            setShowForm(false);
            setEditingAddress(null);
            setNewAddress({ name: '', phone: '', fullAddress: '', default: false });
            fetchAddresses();
        } catch (error) {
            console.error("Lỗi khi thêm/sửa địa chỉ:", error);
            setError(error.response?.data?.message || "Đã xảy ra lỗi khi thêm/sửa địa chỉ.");
        }
    };

    const handleSetDefaultAddress = async (isChecked, address) => {
        setNewAddress({ ...newAddress, default: isChecked });

        if (isChecked && address) {
            try {
                await setDefaultAddress(userId, address.id);
                fetchAddresses();
            } catch (error) {
                console.error("Lỗi khi đặt địa chỉ mặc định:", error);
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            {error && <p className="text-red-500">{error}</p>}
            {addresses.length > 0 ? (
                <div className="space-y-4">
                    {addresses.map((address) => (
                        <div
                            key={address.id || `${address.name}-${address.phone}`}  // Fallback to unique combination
                            className={`p-4 border rounded-lg ${address.default ? 'bg-gray-100 border-red-500' : ''}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{address.name}</h3>
                                    <p className="text-gray-600">Số điện thoại: {address.phone}</p>
                                    <p className="text-gray-600">Địa chỉ: {address.fullAddress}</p>
                                    {address.isDefault === true && (
                                        <span className="text-red-500 text-sm font-semibold">
                                            (Địa chỉ mặc định)
                                        </span>
                                    )}

                                </div>
                                <div className="flex gap-4">
                                    <button
                                        className="text-primary hover:text-blue-600"
                                        onClick={() => handleEdit(address)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} className="text-xl" />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => handleDelete(address.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">Chưa có địa chỉ nào.</p>
            )}

            <div className="mt-6">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    onClick={() => setShowForm(true)}
                >
                    Thêm địa chỉ mới
                </button>
            </div>

            {/* Form thêm hoặc chỉnh sửa địa chỉ (Popup) */}
            {showForm && (
                <AlertDialog open={showForm} onOpenChange={setShowForm}>
                    <AlertDialogTrigger />
                    <AlertDialogContent className="text-black">
                        <AlertDialogHeader>
                            <AlertDialogTitle>{editingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {editingAddress
                                    ? 'Chỉnh sửa thông tin địa chỉ của bạn.'
                                    : 'Điền thông tin để thêm địa chỉ mới.'}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="grid grid-cols-1 gap-4 text-black">
                            <div>
                                <label className="text-sm font-semibold">Họ và tên</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                                    placeholder="Họ và tên"
                                    value={newAddress.name}
                                    onChange={(e) =>
                                        setNewAddress({ ...newAddress, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold">Số điện thoại</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                                    placeholder="Số điện thoại"
                                    value={newAddress.phone}
                                    onChange={(e) =>
                                        setNewAddress({ ...newAddress, phone: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold">Địa chỉ</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                                    placeholder="Địa chỉ"
                                    value={newAddress.fullAddress}
                                    onChange={(e) =>
                                        setNewAddress({ ...newAddress, fullAddress: e.target.value })
                                    }
                                />
                            </div>
                            {editingAddress && (
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="default"
                                        checked={newAddress.default}
                                        onChange={(e) => handleSetDefaultAddress(e.target.checked, editingAddress)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="default" className="text-sm font-semibold">
                                        Đặt làm địa chỉ mặc định
                                    </label>
                                </div>
                            )}
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Đóng</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSaveAddress}>
                                {editingAddress ? 'Lưu thay đổi' : 'Lưu địa chỉ'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
};