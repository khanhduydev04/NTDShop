import React from "react";

export const Breadcrumb = () => {
  const breadcrumbItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/san-pham" },
    { name: "Chi tiết sản phẩm", href: null }, 
  ];

  return (
    <nav
      className="breadcrumb text-sm py-4 bg-gray-100 px-4 rounded-md"
      aria-label="Breadcrumb"
    >
      <ol className="flex space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <a
                href={item.href}
                className="text-blue-500 hover:underline"
              >
                {item.name}
              </a>
            ) : (
              <span className="text-gray-500">{item.name}</span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

