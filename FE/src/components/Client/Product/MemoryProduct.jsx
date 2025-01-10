import React from "react";

export const LaptopMemoryList = () => {
    const memoryOptions = [
        {
            id: 1,
            title: "8GB - 256GB",
            price: "19.890.000đ",
            link: "https://ttcenter.com.vn/macbook-air-m2-13inch-8gb-256gb-new-cpo",
            isActive: true, // Đánh dấu tùy chọn đang được chọn
        },
        {
            id: 2,
            title: "16GB - 512GB",
            price: "24.990.000đ",
            link: "#",
            isActive: false,
        },
        {
            id: 3,
            title: "32GB - 512GB",
            price: "26.990.000đ",
            link: "#",
            isActive: false,
        },
    ];

    return (
        <ul className="flex justify-start items-center gap-2 flex-wrap">
            {memoryOptions.map((option) => (
                <li
                    key={option.id}
                    className={`border border-primary rounded-lg text-sm ${option.isActive ? "bg-blue-100 background-color" : "bg-white"
                        }`}
                >
                    <a
                        href={option.link}
                        title={option.title}
                        className="flex flex-col items-start py-2 px-4 hover:bg-blue-200 hover:rounded-lg transition"
                    >
                        <strong className="font-medium text-gray-800">{option.title}</strong>
                        <span className="text-gray-600">{option.price}</span>
                    </a>
                </li>
            ))}
        </ul>
    );
};

