
export const CardSkeleton = () => (
  <div className="card p-6 animate-pulse">
    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-10 bg-gray-200 rounded"></div>
  </div>
);

export const PackageCardSkeleton = () => (
  <div className="card overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-gray-200"></div>
    <div className="p-6">
      <div className="h-7 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 bg-gray-200 rounded w-24"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const ProductCardSkeleton = () => (
  <div className="border rounded-lg p-3 animate-pulse">
    <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
    <div className="h-4 bg-gray-200 rounded mb-1"></div>
    <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-8 bg-gray-200 rounded"></div>
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="card hover:shadow-elegant-md transition-shadow duration-300 overflow-hidden animate-pulse">
    <div className="aspect-[3/2] bg-gray-200"></div>
    <div className="p-6 text-center">
      <div className="h-7 bg-gray-200 rounded mb-3 mx-auto w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
    </div>
  </div>
);

export const ListSkeleton = ({ count = 3 }) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="card p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const GridSkeleton = ({ count = 6, type = 'card' }) => {
  const SkeletonComponent = {
    card: CardSkeleton,
    package: PackageCardSkeleton,
    product: ProductCardSkeleton,
    category: CategoryCardSkeleton,
  }[type] || CardSkeleton;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
};

export default GridSkeleton;
