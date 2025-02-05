import PropTypes from "prop-types";

export const LaptopMemoryList = ({
  memoryVariants,
  activeMemoryId,
  onMemorySelect,
}) => {
  return (
    <ul className="flex justify-start items-center gap-2 flex-wrap">
      {memoryVariants.map((variant) => (
        <li
          key={variant.id}
          className={`border rounded-lg text-sm ${
            activeMemoryId === variant.id
              ? "border-primary bg-blue-50"
              : "border-gray-300"
          }`}
        >
          <a
            href="#"
            title={variant.storage || "Memory Variant"}
            className="text-sm lg:text-base flex flex-col items-start py-1 px-3 lg:py-2 lg:px-4"
            onClick={(e) => {
              e.preventDefault();
              onMemorySelect(variant.id);
            }}
          >
            <span className="font-medium text-gray-800">
              {variant.storage ? `${variant.storage}` : "Unknown Memory"}
            </span>
            <span className="text-gray-600">
              {variant.price.toLocaleString("vi-VN")}đ
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

LaptopMemoryList.propTypes = {
  memoryVariants: PropTypes.array.isRequired,
  activeMemoryId: PropTypes.number.isRequired,
  onMemorySelect: PropTypes.func.isRequired,
};
