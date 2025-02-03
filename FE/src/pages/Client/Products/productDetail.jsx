import { SliderProduct } from "../../../components/Common/Slider/sliderProduct";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { LaptopMemoryList } from "@/components/Client/Product/MemoryProduct";
import { ColorOptions } from "@/components/Client/Product/ColorProduct";
import { Button } from "../../../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Specifications from "@/components/Client/Product/Specifications";
import { useParams } from "react-router-dom";
import { getProductDetail, getProductsFilter } from "@/services/product";
import { useEffect, useState } from "react";
import ProductReview from "@/components/Client/Product/ReviewProduct";
import ProductMainSlider from "@/components/common/Slider/ProductMainSlider";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice'; // Import action addToCart

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [colorVariants, setColorVariants] = useState([]);
  const [memoryVariants, setMemoryVariants] = useState([]);
  const [activeMemoryId, setActiveMemoryId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductDetail(slug);

      const relatedProductsData = await getProductsFilter({
        category: data.category.slug,
        limit: 10,
      });

      setRelatedProducts(relatedProductsData.data);

      // Tạo mảng images
      const imageUrls = [
        data.thumbnail,
        ...data.productImages.map((img) => img.imageUrl),
      ];
      setImages(imageUrls);

      // Tạo mảng colorVariants và memoryVariants
      const colors = data.productVariants
        .filter((variant) => variant.color)
        .map((variant) => ({
          id: variant.id,
          color: variant.color,
          image: variant.imageUrl || null, // Dữ liệu hình ảnh nếu có
          price: variant.price || 0,
        }));

      const memories = data.productVariants
        .filter((variant) => variant.storage)
        .map((variant) => ({
          id: variant.id,
          storage: variant.storage,
          price: variant.price || 0,
        }));

      setColorVariants(colors);
      setMemoryVariants(memories);
      setActiveMemoryId(memories[0]?.id);
      setSelectedColorId(colors[0]?.id);

      setProduct(data);
      setIsLoading(false);
    };

    fetchProduct();
  }, [slug]);

  // Xử lý sự kiện chọn Memory
  const handleMemorySelect = (memoryId) => {
    setActiveMemoryId(memoryId);
  };

  // Xử lý sự kiện chọn Color
  const handleColorSelect = (colorId) => {
    setSelectedColorId(colorId);
  };

  // Xử lý sự kiện thêm vào giỏ hàng
  const handleAddToCart = () => {
    const variantId = activeMemoryId || selectedColorId;
    if (variantId) {
      dispatch(addToCart({ id: product.id, variantId, quantity: 1 })); // Thêm sản phẩm vào giỏ hàng với số lượng 1
    } else {
      alert('Vui lòng chọn màu sắc và dung lượng');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pb-10">
      <Breadcrumb />
      <h2 className="text-2xl text-primary font-bold mt-4">{product?.name}</h2>
      <div className="bg-blue-200 h-[0.1px] w-full my-8" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-black">
        <div className="md:col-span-2">
          <SliderProduct images={images} />
        </div>
        <div className="md:col-span-2">
          {memoryVariants.length > 0 && (
            <>
              <h3 className="text-primary text-lg font-medium mb-3">
                Chọn RAM - GB
              </h3>
              <div className="w-full my-4">
                <LaptopMemoryList
                  memoryVariants={memoryVariants}
                  activeMemoryId={activeMemoryId}
                  onMemorySelect={handleMemorySelect}
                />
              </div>
            </>
          )}
          {colorVariants.length > 0 && (
            <>
              <h3 className="text-primary text-lg font-medium mb-3">
                Chọn màu để xem giá và chi nhánh có hàng
              </h3>
              <div className="w-[250px]">
                <ColorOptions
                  colorVariants={colorVariants}
                  onColorSelect={handleColorSelect}
                />
              </div>
            </>
          )}
          <div className="my-8 flex justify-center items-center gap-2 ">
            <Button
              bgColor={"delete"}
              className={"w-full py-1 text-lg font-semibold"}
              onClick={handleAddToCart} // Thêm sự kiện onClick cho nút "Mua ngay"
            >
              Mua ngay
              <p className="text-sm font-light">
                (Giao hàng tận nơi hoặc lấy tại cửa hàng)
              </p>
            </Button>
            <Button
              bgColor={"outline"}
              className={"h-[64px] w-[70px] text-lg font-semibold"}
              onClick={handleAddToCart} // Thêm sự kiện onClick cho nút giỏ hàng
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Button>
          </div>
        </div>
        <div className="">
          <div className="box_list_extra_offer border rounded-lg p-4 bg-gray-100">
            <div className="title_info_product_detail mb-4">
              <h2 className="text-lg font-bold text-gray-800">Ưu đãi thêm</h2>
            </div>
            <div className="list_extra_offer">
              <ul className="space-y-2">
                <li className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Tặng kèm đầy đủ phụ kiện
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Hỗ trợ phần mềm trọn đời
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Miễn phí cài win + vệ sinh máy
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Hỗ trợ thu cũ đổi mới- Trợ giá tốt nhất
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <ul className="space-y-2 list-disc pl-5">
              <li className="text-sm text-gray-700">
                Bảo hành tối đa 36 tháng
              </li>
              <li className="text-sm text-gray-700">
                Trong vòng 14 ngày lỗi 1 đổi 1
              </li>
              <li className="text-sm text-gray-700">
                Miễn phí giao hàng toàn quốc
              </li>
              <li className="text-sm text-gray-700">
                Hỗ trợ trả góp 0% lãi suất
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-5 pt-10 pb-5">
        <h3 className="md:text-lg lg:text-2xl text-textPrimary font-bold mb-3">
          Sản phẩm liên quan
        </h3>
        <ProductMainSlider data={relatedProducts} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="md:col-span-2">
          <ProductReview product={product} />
        </div>
        <div className="md:col-span-1">
          <Specifications specifications={product?.productSpecifications} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;