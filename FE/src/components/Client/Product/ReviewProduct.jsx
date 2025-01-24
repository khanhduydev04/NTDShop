import { Button } from "@/components/common/Button";
import { useState } from "react";
import PropTypes from "prop-types";

const ProductReview = ({ product }) => {
  const { name, description, thumbnail } = product || {};
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="content">
      <h2 className="text-justify text-xl font-bold border-b-2 border-gray-300 p-2">
        {name}
      </h2>
      <p className="text-gray-700 text-justify mt-2">
        {isExpanded ? description : `${description.slice(0, 150)}...`}
      </p>
      {isExpanded && thumbnail && (
        <img src={thumbnail} alt={name} className="w-full" />
      )}
      <div className="w-full flex justify-center items-center gap-2 mt-4">
        <Button bgColor="seeMore" onClick={toggleContent}>
          {isExpanded ? "Thu gọn" : "Đọc thêm"}
        </Button>
      </div>
    </div>
  );
};

ProductReview.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductReview;
