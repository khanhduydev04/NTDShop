import ProductCard from "@/components/Client/Product/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PropTypes from "prop-types";
import Autoplay from "embla-carousel-autoplay";

const ProductMainSlider = ({ data }) => {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4 py-2 flex items-stretch">
          {data.length > 0 ? (
            data.map((item, index) => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-2 md:pl-4 flex"
                key={index}
              >
                <ProductCard
                  id={item.id}
                  thumbnail={item.image}
                  name={item.name}
                  price={item.price}
                  slug={item.slug}
                  sale={item.priceSale}
                  variantId={item.productVariants}
                ></ProductCard>
              </CarouselItem>
            ))
          ) : (
            <p>Không có sản phẩm</p>
          )}
        </CarouselContent>
        <CarouselPrevious className="size-10 hidden md:flex" />
        <CarouselNext className="size-10 hidden md:flex" />
      </Carousel>
    </>
  );
};

ProductMainSlider.propTypes = {
  data: PropTypes.array,
};

export default ProductMainSlider;
