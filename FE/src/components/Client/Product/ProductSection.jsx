import PropTypes from "prop-types";
import ProductMainSlider from "@/components/common/Slider/ProductMainSlider";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductSection = ({ data, title, subCategory, categorySlug }) => {
  return (
    <section className="container pb-16">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg md:text-[20px] lg:text-3xl text-textPrimary font-bold">
          Laptop {title} nổi bật
        </h3>
        <div className="flex items-center justify-end gap-3">
          {/* <ul className="hidden md:block">
            {subCategory.map((item, index) => (
              <li key={index} className="inline-block mr-2.5">
                <Link
                  to={`/san-pham?danh-muc=${categorySlug}&danh-muc-con=${item.slug}`}
                  className="text-textBlack text-sm uppercase rounded-full px-4 pt-1.5 pb-2 border border-white bg-white shadow-custom hover:border-textPrimary hover:text-textPrimary hover:bg-textPrimary/10 transition-all"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul> */}
          <Button
            className="bg-textPrimary hover:bg-textPrimary/80 rounded-full transition-all"
            asChild
          >
            <Link to={`/san-pham?danh-muc=${categorySlug}`}>Xem tất cả</Link>
          </Button>
        </div>
      </div>
      {/* <ul className="block md:hidden my-3">
        {subCategory.map((item, index) => (
          <li key={index} className="inline-block mr-2.5">
            <Link
              to={`/san-pham?danh-muc=${categorySlug}&danh-muc-con=${item.slug}`}
              className="text-textBlack text-sm uppercase rounded-full px-4 pt-1.5 pb-2 border border-white bg-white shadow-custom hover:border-textPrimary hover:text-textPrimary hover:bg-textPrimary/10 transition-all"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul> */}
      <ProductMainSlider data={data}></ProductMainSlider>
    </section>
  );
};

ProductSection.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  subCategory: PropTypes.array,
  categorySlug: PropTypes.string,
};

export default ProductSection;
