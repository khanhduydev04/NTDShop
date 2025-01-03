import React from 'react';
import { SliderProduct } from '../../../components/Common/Slider/sliderProduct';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { LaptopMemoryList } from '@/components/Client/Product/MemoryProduct';
import { ColorOptions } from '@/components/Client/Product/ColorProduct';
import { Button } from '../../../components/common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Specifications from '@/components/Client/Product/Specifications';
import ProductReview from '@/components/Client/Product/ReviewProduct';

const ProductDetailPage = () => {
    const specsData = [
        { label: "CPU", value: "AMD Ryzen™ 5 8640HS (up to 4.9 GHz, 16 MB L3 cache, 6 cores, 12 threads)" },
        { label: "RAM", value: "16GB LPDDR5 6400MHz (Onboard)" },
        { label: "Ổ Cứng", value: "512 GB PCIe® NVMe™ M.2 SSD" },
        { label: "Màn hình", value: "14\" diagonal, WUXGA (1920 x 1200), multitouch-enabled, IPS, edge-to-edge glass, micro-edge 300 nits" },
        { label: "Card đồ hoạ", value: "AMD Radeon™ Graphics" },
        { label: "Pin", value: "3-cell, 59 Wh" },
        { label: "Bàn phím", value: "Có LED" },
        {
            label: "Kết nối",
            value: [
                "1x Headphone/microphone combo",
                "2x USB Type-A",
                "1x HDMI 2.1",
                "2x USB Type-C®",
            ],
        },
        { label: "Webcam", value: "FHD" },
        { label: "Trọng lượng (kg)", value: "1.39" },
        { label: "Hệ điều hành", value: "Windows bản quyền" },
    ];

    const product = {
        title: "Đánh giá HP Envy x360 14-fa0013dx (2024)",
        shortDescription: `HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau.  Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét... Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét...
           Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét... Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét... Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét... Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét...`,
        fullDescription: `
          Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét...
           Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét... Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét... Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét... Phong Cách Sang Trọng, Xoay Gập Linh Hoạt
          HP Envy x360 14-fa0013dx sở hữu thiết kế xoay gập 360 độ, giúp người dùng dễ dàng chuyển đổi giữa các chế độ làm việc khác nhau...
          Màn Hình Cảm Ứng Sắc Nét
          Với màn hình 14 inch độ phân giải WUXGA (1920x1200), HP Envy x360 14-fa0013dx mang đến những hình ảnh sắc nét...
        `,
        imageUrl: "https://cdnphoto.dantri.com.vn/TGECgt5oMp0KkjSj7qrtCs3GXF8=/2025/01/03/dethihoainam3-1735857840278.jpg"
    };


    return (
        <div>
            <Breadcrumb />
            <h3 className='text-2xl text-primary font-bold mt-4'>Macbook Air M2 13inch 8GB 256GB</h3>
            <div className='bg-blue-200 h-[0.1px] w-full my-8' />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-black">
                <div className="md:col-span-2">
                    <SliderProduct />
                </div>
                <div className="md:col-span-2">
                    <h3 className='text-primary text-lg font-medium mb-3'>Chọn RAM - GB</h3>
                    <div className="w-full my-4">
                        <LaptopMemoryList />
                    </div>
                    <h3 className='text-primary text-lg font-medium mb-3'>Chọn màu để xem giá và chi nhánh có hàng</h3>
                    <div className="w-[250px]">
                        <ColorOptions />
                    </div>
                    <div className="my-8 flex justify-center items-center gap-2 ">
                        <Button bgColor={"delete"} className={"w-full py-1 text-lg font-semibold"}>
                            Mua ngay
                            <p className="text-sm font-light">(Giao hàng tận nơi hoặc lấy tại cửa hàng)</p>
                        </Button>
                        <Button bgColor={"outline"} className={"h-[64px] w-[70px] text-lg font-semibold"}>
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
                                    <FontAwesomeIcon icon={faCircleCheck} className='text-green-500' />
                                    <span className="text-sm text-gray-700">Tặng kèm đầy đủ phụ kiện</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <FontAwesomeIcon icon={faCircleCheck} className='text-green-500' />
                                    <span className="text-sm text-gray-700">Hỗ trợ phần mềm trọn đời</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <FontAwesomeIcon icon={faCircleCheck} className='text-green-500' />
                                    <span className="text-sm text-gray-700">Miễn phí cài win + vệ sinh máy</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <FontAwesomeIcon icon={faCircleCheck} className='text-green-500' />
                                    <span className="text-sm text-gray-700">Hỗ trợ thu cũ đổi mới- Trợ giá tốt nhất</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4">
                        <ul className="space-y-2 list-disc pl-5">
                            <li className="text-sm text-gray-700">Bảo hành tối đa 36 tháng</li>
                            <li className="text-sm text-gray-700">Trong vòng 14 ngày lỗi 1 đổi 1</li>
                            <li className="text-sm text-gray-700">Miễn phí giao hàng toàn quốc</li>
                            <li className="text-sm text-gray-700">Hỗ trợ trả góp 0% lãi suất</li>
                        </ul>
                    </div>

                </div>
            </div>
            <p className='text-2xl text-center my-10 py-32 bg-blue-100'>Khúc này chuyền cái slider sản phẩm</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                <div className="md:col-span-2">
                    <ProductReview
                       product={product} 
                    />
                </div>
                <div className="md:col-span-1">
                    <Specifications specifications={specsData} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;