import PropTypes from "prop-types";
import { useState } from "react";

export const ColorOptions = ({ colorVariants, onColorSelect }) => {
  const [selectedColor, setSelectedColor] = useState(colorVariants[0]?.id);

  const handleSelect = (id) => {
    setSelectedColor(id);
    onColorSelect(id);
  };

  return (
    <ul className="grid grid-cols-2 gap-2">
      {colorVariants.map((variant) => (
        <li
          key={variant.id}
          className={`flex justify-center gap-2 items-center border p-1 rounded-md cursor-pointer ${
            selectedColor === variant.id
              ? "border-primary bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => handleSelect(variant.id)}
        >
          {/* Chỉ hiển thị img nếu variant.image tồn tại */}
          {variant.image && (
            <img
              src={variant.image}
              alt={variant.color}
              title={variant.color}
              className="w-10 h-10 object-contain mb-2"
            />
          )}
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-800">
              {variant.color || "Unknown Color"}
            </span>
            <span className="text-gray-600">
              {variant.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

ColorOptions.propTypes = {
  colorVariants: PropTypes.array.isRequired,
  onColorSelect: PropTypes.func.isRequired,
};
