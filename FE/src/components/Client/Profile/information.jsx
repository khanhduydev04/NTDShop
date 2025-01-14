import { Button } from '@/components/common/Button'
import React, { useState } from 'react'

export const Information = () => {
    const [formData, setFormData] = useState({
        name: 'Đinh Phương Nhã',
        email: 'phuongnha@example.com',
        phone: '0123456789',
        address: '123 Đường ABC, Quận XYZ',
    });

    return (
        <div className="">
            <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                    <img
                        src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
                        className='size-24 rounded-full'
                        alt="Avatar"
                    />
                    <Button bgColor='text'>
                        Sửa ảnh
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="col-span-1">
                    <label htmlFor="name" className="text-md font-semibold">Họ và tên</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="email" className="text-md font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="phone" className="text-md font-semibold">Số điện thoại</label>
                    <input
                        type="text"
                        id="phone"
                        value={formData.phone}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="address" className="text-md font-semibold">Địa chỉ</label>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                    />
                </div>
                <div className="text-center w-full col-span-2">
                    <Button bgColor='primary' className='w-1/3'>
                        Cập nhật thông tin
                    </Button>
                </div>
            </div>
        </div>
    )
}
