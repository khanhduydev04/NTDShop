import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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

export const AddressList = () => {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: 'Đinh Phương Nhã',
            phone: '0123456789',
            address: '123 Đường A, Quận B, Thành phố C',
            default: true,
        },
        {
            id: 2,
            name: 'Nguyễn Văn A',
            phone: '0987654321',
            address: '456 Đường D, Quận E, Thành phố F',
            default: false,
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        address: '',
        default: false, 
    });
    const [editingAddress, setEditingAddress] = useState(null);

    const handleEdit = (address) => {
        setEditingAddress(address);
        setNewAddress({
            name: address.name,
            phone: address.phone,
            address: address.address,
            default: address.default, 
        });
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?');
        if (confirmDelete) {
            setAddresses(addresses.filter((address) => address.id !== id));
        }
    };

    const handleAddAddress = () => {
        if (!newAddress.name || !newAddress.phone || !newAddress.address) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const updatedAddresses = newAddress.default
            ? addresses.map((address) => ({ ...address, default: false }))
            : addresses;

        setAddresses([
            ...updatedAddresses,
            {
                id: addresses.length + 1,
                name: newAddress.name,
                phone: newAddress.phone,
                address: newAddress.address,
                default: newAddress.default,
            },
        ]);
        setNewAddress({ name: '', phone: '', address: '', default: false });
        setShowForm(false);
    };

    const handleSaveAddress = () => {
        if (!newAddress.name || !newAddress.phone || !newAddress.address) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Ensure only one default address
        const updatedAddresses = newAddress.default
            ? addresses.map((address) => ({ ...address, default: false })) // Set all to non-default
            : addresses;

        if (editingAddress) {
            const updatedList = updatedAddresses.map((address) =>
                address.id === editingAddress.id
                    ? { ...address, ...newAddress }
                    : address
            );
            setAddresses(updatedList);
            setEditingAddress(null);
        } else {
            setAddresses([
                ...updatedAddresses,
                {
                    id: addresses.length + 1,
                    name: newAddress.name,
                    phone: newAddress.phone,
                    address: newAddress.address,
                    default: newAddress.default,
                },
            ]);
        }

        setNewAddress({ name: '', phone: '', address: '', default: false });
        setShowForm(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            {addresses.length > 0 ? (
                <div className="space-y-4">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            className={`p-4 border rounded-lg ${
                                address.default ? 'bg-gray-100 border-red-500' : ''
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{address.name}</h3>
                                    <p className="text-gray-600">Số điện thoại: {address.phone}</p>
                                    <p className="text-gray-600">Địa chỉ: {address.address}</p>
                                    {address.default && (
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
                <p className="text-gray-500 text-center">Không có địa chỉ nào.</p>
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
                                    value={newAddress.address}
                                    onChange={(e) =>
                                        setNewAddress({ ...newAddress, address: e.target.value })
                                    }
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="default"
                                    checked={newAddress.default}
                                    onChange={(e) =>
                                        setNewAddress({ ...newAddress, default: e.target.checked })
                                    }
                                    className="mr-2"
                                />
                                <label htmlFor="default" className="text-sm font-semibold">
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>
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
