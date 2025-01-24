import { useEffect, useState } from "react";
import ProductSection from "@/components/Client/Product/ProductSection";
import ProductMainSlider from "@/components/common/Slider/ProductMainSlider";
import {
  getProductsFilter,
  getTopDiscountedProducts,
} from "@/services/product";
import ProductSkeleton from "@/components/Client/Loading/ProductSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import Countdown from "@/components/common/Countdown/Countdown,";
import Banner from "@/components/Client/Banner";

const discountData = [
  {
    id: 8,
    slug: "asus-zenbook-14-oled-q415-2024",
    name: "Asus Zenbook 14 OLED Q415 (2024)",
    createdAt: "2025-01-11T10:40:48.0361801",
    price: 14490000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1736566846252_asus-zenbook-14-oled-q415-2024_1.jpg",
    category: {
      id: 2,
      name: "Asus",
      slug: "asus",
    },
  },
  {
    id: 6,
    slug: "dell-xps-13",
    name: "Dell XPS 13 9340 Core Ultra 7",
    createdAt: "2025-01-04T16:58:55.0988162",
    price: 19000000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1736652102569_aqqzy9v1-1836-dell-xps-14-9440.jpg",
    category: {
      id: 1,
      name: "Dell",
      slug: "dell",
    },
  },
  {
    id: 7,
    slug: "dell-xps-14-9440",
    name: "Dell XPS 14 9440 (2024)",
    createdAt: "2025-01-04T21:08:06.0779019",
    price: 32990000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1735999684074_aqqzy9v1-1836-dell-xps-14-9440.jpg",
    category: {
      id: 1,
      name: "Dell",
      slug: "dell",
    },
  },
  {
    id: 5,
    slug: "asus-zenbook-14-oled-q415-2024",
    name: "Asus Zenbook 14 OLED Q415 (2024)",
    createdAt: "2025-01-11T10:40:48.0361801",
    price: 14490000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1736566846252_asus-zenbook-14-oled-q415-2024_1.jpg",
    category: {
      id: 2,
      name: "Asus",
      slug: "asus",
    },
  },
  {
    id: 4,
    slug: "dell-xps-13",
    name: "Dell XPS 13 9340 Core Ultra 7",
    createdAt: "2025-01-04T16:58:55.0988162",
    price: 19000000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1736652102569_aqqzy9v1-1836-dell-xps-14-9440.jpg",
    category: {
      id: 1,
      name: "Dell",
      slug: "dell",
    },
  },
  {
    id: 3,
    slug: "dell-xps-14-9440",
    name: "Dell XPS 14 9440 (2024)",
    createdAt: "2025-01-04T21:08:06.0779019",
    price: 32990000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1735999684074_aqqzy9v1-1836-dell-xps-14-9440.jpg",
    category: {
      id: 1,
      name: "Dell",
      slug: "dell",
    },
  },
  {
    id: 2,
    slug: "asus-zenbook-14-oled-q415-2024",
    name: "Asus Zenbook 14 OLED Q415 (2024)",
    createdAt: "2025-01-11T10:40:48.0361801",
    price: 14490000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1736566846252_asus-zenbook-14-oled-q415-2024_1.jpg",
    category: {
      id: 2,
      name: "Asus",
      slug: "asus",
    },
  },
  {
    id: 1,
    slug: "dell-xps-13",
    name: "Dell XPS 13 9340 Core Ultra 7",
    createdAt: "2025-01-04T16:58:55.0988162",
    price: 19000000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1736652102569_aqqzy9v1-1836-dell-xps-14-9440.jpg",
    category: {
      id: 1,
      name: "Dell",
      slug: "dell",
    },
  },
  {
    id: 9,
    slug: "dell-xps-14-9440",
    name: "Dell XPS 14 9440 (2024)",
    createdAt: "2025-01-04T21:08:06.0779019",
    price: 32990000.0,
    priceSale: 0.0,
    image:
      "https://storage.googleapis.com/ecma-722ac.appspot.com/products/thumbnails/1735999684074_aqqzy9v1-1836-dell-xps-14-9440.jpg",
    category: {
      id: 1,
      name: "Dell",
      slug: "dell",
    },
  },
];

const HomePage = () => {
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [discountProducts, setDiscountProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCategorizeProducts = async () => {
      try {
        const [response, responseDiscount] = await Promise.all([
          getProductsFilter({ limit: 100, offset: 0 }),
          getTopDiscountedProducts(),
        ]);
        const { data } = response;
        setDiscountProducts(responseDiscount);
        // Phân loại sản phẩm theo category.name
        const categorized = data.reduce((acc, product) => {
          const categoryName = product?.category?.name || "Khác";
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(product);
          return acc;
        }, {});

        setCategorizedProducts(categorized);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCategorizeProducts();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[100px] rounded-full" />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Banner />
      <div className="w-full bg-[url('/images/background_flashsale.jpg')] bg-center bg-cover mb-16">
        <div className="container py-10">
          <div className="flex justify-between mb-3">
            <h2 className="uppercase text-[30px] font-bold italic text-[#FAFF00] drop-shadow">
              <img
                src="/images/lightning.png"
                alt=""
                className="w-[50px] inline align-middle"
              />
              Flash sale cực hot
            </h2>

            <Countdown targetDate="2025-01-27T12:00:00"></Countdown>
          </div>
          {/* {discountProducts.length > 0 && (
          <ProductMainSlider data={discountProducts} />
        )} */}
          {discountData.length > 0 && <ProductMainSlider data={discountData} />}
        </div>
      </div>
      <div>
        {Object.entries(categorizedProducts).map(([categoryName, products]) => (
          <ProductSection
            key={categoryName}
            data={products}
            title={categoryName}
            categorySlug={products[0]?.category?.slug}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
