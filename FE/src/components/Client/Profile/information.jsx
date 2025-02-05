import { Button } from "@/components/common/Button";
import React, { useEffect, useState } from "react";

export const Information = ({ user }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        gender: "",
        dateOfBirth: "",
    });

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                address: user.address || "",
                gender: user.gender || "",
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
            });
        }
    }, [user]);

    return (
        <div>
            <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                    <img
                        src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
                        className="size-24 rounded-full"
                        alt="Avatar"
                    />
                    <Button bgColor="text">Sửa ảnh</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="col-span-1">
                    <label htmlFor="fullName" className="text-md font-semibold">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                        readOnly
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="phoneNumber" className="text-md font-semibold">
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                        readOnly
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="gender" className="text-md font-semibold">
                        Giới tính
                    </label>
                    <input
                        type="text"
                        id="gender"
                        value={formData.gender}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                        readOnly
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="dateOfBirth" className="text-md font-semibold">
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};
