import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/Client/Product/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRICINGS, FILTERS } from "@/constants";
import { getProductsFilter } from "@/services/product";
import { getNeeds } from "@/services/need";
import ProductSkeleton from "@/components/Client/Loading/ProductSkeleton";
import { getCategories } from "@/services/category";

const FILTER_ICONS = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
        />
      </svg>
    ),
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
        />
      </svg>
    ),
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 mr-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
        />
      </svg>
    ),
  },
];

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [remainingData, setRemainingData] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 1;

  const updateURLParams = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
    setOffset(0);
  };

  const selectedNeed = searchParams.get("nhu-cau") || "";
  const selectedPricing = searchParams.get("muc-gia") || "";
  const selectedFilter = searchParams.get("sap-xep") || "moi-nhat";
  const selectedCategory = searchParams.get("danh-muc") || "";
  const selectedName = searchParams.get("ten") || "";

  const fetchData = async (isLoadMore = false, customOffset = offset) => {
    try {
      setLoading(true);
      const params = {
        needId: selectedNeed,
        pricingValue: selectedPricing,
        sortOrder: selectedFilter,
        category: selectedCategory,
        name: selectedName,
        limit,
        offset: customOffset,
      };

      const data = await getProductsFilter(params);

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...data.data]);
      } else {
        setProducts(data.data);
      }
      setRemainingData(data.remaining_data);
    } catch (error) {
      console.error("Lỗi khi gọi API sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    selectedNeed,
    selectedPricing,
    selectedFilter,
    selectedCategory,
    selectedName,
  ]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const [needsData, categoriesData] = await Promise.all([
          getNeeds(),
          getCategories(),
        ]);
        setNeeds(needsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Lỗi khi gọi API danh mục & nhu cầu:", error);
      }
    };

    fetchAdditionalData();
  }, []);

  const handleLoadMore = () => {
    if (loading || remainingData === 0) return;

    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchData(true, newOffset);
  };

  return (
    <div className="py-5 container">
      {categories.length > 0 && !selectedName && (
        <div className="flex flex-wrap gap-3 pb-3 mb-2.5 border-b border-textPrimary">
          {categories.map((category) => (
            <div
              key={category.id}
              className="h-8 max-w-[100px]"
              onClick={() => updateURLParams("danh-muc", category.slug)}
            >
              <img
                src={category.logo}
                alt={category.name}
                className="h-full object-contain cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
      <div>
        {needs.length > 0 && (
          <>
            <h3 className="text-textPrimary font-bold mb-2.5">Nhu cầu</h3>
            {needs.map((need) => (
              <Badge
                key={need.id}
                variant={selectedNeed === need.id ? "primary" : "secondary"}
                className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-full select-none mr-2.5 mb-2.5 leading-5"
                onClick={() => updateURLParams("nhu-cau", need.id)}
              >
                {need.name}
              </Badge>
            ))}
          </>
        )}
        <h3 className="text-textPrimary font-bold mb-2.5 mt-2">Mức giá</h3>
        {PRICINGS.map((price) => (
          <Badge
            key={price.value}
            variant={
              Number(selectedPricing) === price.value ? "primary" : "secondary"
            }
            className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-full select-none mr-2.5 mb-2.5 leading-5"
            onClick={() => updateURLParams("muc-gia", price.value)}
          >
            {price.title}
          </Badge>
        ))}

        <h3 className="text-textPrimary font-bold mb-2.5 mt-2">Sắp xếp theo</h3>
        {FILTERS.map((filter, index) => (
          <Badge
            key={filter.value}
            variant={selectedFilter === filter.value ? "primary" : "secondary"}
            className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-full select-none mr-2.5 mb-2.5 leading-5"
            onClick={() => updateURLParams("sap-xep", filter.value)}
          >
            {FILTER_ICONS[index]?.icon}
            {filter.title}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5 mb-10">
        {loading ? (
          products.length > 0 ? (
            <>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  thumbnail={product.image}
                  price={product.price}
                  sale={product.priceSale}
                />
              ))}
              {Array.from({ length: 5 }).map((_, index) => (
                <ProductSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          ) : (
            Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
          )
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              thumbnail={product.image}
              price={product.price}
              sale={product.priceSale}
            />
          ))
        ) : (
          <div className="col-span-5 text-center text-lg text-textPrimary font-semibold">
            Không có sản phẩm bạn cần tìm
          </div>
        )}
      </div>
      <div className="flex justify-center">
        {remainingData > 0 && (
          <Button
            className="bg-textPrimary hover:bg-textPrimary/80 rounded-full transition-all w-[188px] text-center"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? (
              <div className="size-6 border-[3px] border-white animate-spin rounded-full"></div>
            ) : (
              `Xem thêm ${remainingData} sản phẩm`
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Products;
