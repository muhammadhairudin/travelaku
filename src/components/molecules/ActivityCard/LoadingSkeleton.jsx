const ActivityCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-video rounded-t-lg" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
};

export default ActivityCardSkeleton; 