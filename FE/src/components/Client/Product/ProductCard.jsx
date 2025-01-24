import PropTypes from "prop-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatNumber";

const ProductCard = ({ id, slug, name, thumbnail, price, sale, variantId }) => {
  return (
    <Link
      to={`/san-pham/${slug}`}
      className="w-full relative h-full flex justify-between"
    >
      <Card className="py-7 px-5 group shadow-custom border border-white hover:border-gray-200">
        <div className="overflow-hidden">
          <img
            src={thumbnail}
            alt={name}
            className="w-full align-middle transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <CardContent className="text-center p-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CardTitle className="font-normal line-clamp-2">
                  {name}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-textPrimary font-semibold text-lg">
            {formatCurrency(price)}
          </p>
          {sale > 0 && (
            <p className="flex justify-center gap-1 text-sm">
              <span className="text-gray-400 line-through">
                {formatCurrency(sale)}
              </span>
              <span className="text-textPrimary font-medium">
                Giảm {((1 - price / sale) * 100).toFixed(2)}%
              </span>
            </p>
          )}
        </CardContent>
      </Card>
      <div className="bg-textPrimary text-white rounded-full flex justify-center items-center absolute top-2.5 right-2.5 p-1.5 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 group-hover:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 hidden group-hover:block"
        >
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sale: PropTypes.number,
  variantId: PropTypes.number,
};

export default ProductCard;
