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
      <Card className="py-5 lg:py-7 px-3 lg:px-5 group shadow-custom border border-white hover:border-gray-200">
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
                <CardTitle
                  className="font-normal line-clamp-2"
                >
                  {name}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-textPrimary font-semibold text-base lg:text-lg">
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