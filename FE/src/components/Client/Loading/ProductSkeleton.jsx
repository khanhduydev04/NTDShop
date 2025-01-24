import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col space-y-5">
      {/* Image Skeleton */}
      <Skeleton className="h-[200px] w-full rounded-xl" />

      {/* Text Skeletons */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      {/* Price Skeletons */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
