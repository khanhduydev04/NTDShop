import React, { useState } from "react";

export const ColorOptions = () => {
    const colorOptions = [
        {
            id: 1015,
            value: 19890000,
            image: "https://ttcenter.com.vn/uploads/product_color/arp5e6w0-1015-midnight.jpg",
            name: "Midnight",
        },
        {
            id: 1014,
            value: 19890000,
            image: "https://ttcenter.com.vn/uploads/product_color/f9y8z5pk-1014-starlight.jpg",
            name: "Starlight",
        },
        {
            id: 1013,
            value: 19890000,
            image: "https://ttcenter.com.vn/uploads/product_color/4d1v42pa-1013-gray.jpg",
            name: "Gray",
        },
        {
            id: 1088,
            value: 19890000,
            image: "https://ttcenter.com.vn/uploads/product_color/qjwfjpza-1088-silver.jpg",
            name: "Silver",
        },
    ];

    const [selectedColor, setSelectedColor] = useState(null);

    const handleSelect = (id) => {
        setSelectedColor(id);
    };

    return (
        <ul className="grid grid-cols-2 gap-2">
            {colorOptions.map((option) => (
                <li
                    key={option.id}
                    className={`flex justify-center gap-2 items-center border px-2 rounded-md cursor-pointer ${selectedColor === option.id ? "border-primary bg-blue-50" : "border-gray-300"
                        }`}
                    onClick={() => handleSelect(option.id)}
                >
                    <img
                        src={option.image}
                        alt={option.name}
                        title={option.name}
                        className="w-10 h-10 object-contain mb-2"
                    />
                    <div className="flex flex-col text-[10px]">
                        <strong className="text-gray-800">{option.name}</strong>
                        <span className="text-gray-600">{option.value.toLocaleString("vi-VN")}đ</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};
