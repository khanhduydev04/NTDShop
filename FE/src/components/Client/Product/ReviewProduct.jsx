import { Button } from '@/components/common/Button';
import React, { useState } from 'react';

const ProductReview = ({ product }) => {
    const { title, shortDescription, fullDescription, imageUrl } = product;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="content">
            <h2 className="text-justify text-xl font-bold border-b-2 border-gray-300 p-2">
                {title}
            </h2>
            <p>
                {shortDescription}
                {isExpanded && (
                    <>
                        <img src={imageUrl} alt="Product" className="w-full mt-4" />
                        <div>{fullDescription}</div>
                    </>
                )}
            </p>
            <div className="w-full flex justify-center items-center gap-2 mt-4">
                <Button bgColor="seeMore" onClick={toggleContent}>
                    {isExpanded ? ">> Thu gọn" : ">> Đọc thêm"}
                </Button>
            </div>

        </div>
    );
};

export default ProductReview;
