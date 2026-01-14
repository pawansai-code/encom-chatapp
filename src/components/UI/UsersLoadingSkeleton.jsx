const UsersLoadingSkeleton = () => {
  return (
    <div className="mt-4 px-3">
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="d-flex align-items-center gap-3 w-100 p-2 py-3 rounded mb-2">
          {/* Avatar skeleton */}
          <div
            className="rounded-circle bg-secondary bg-opacity-10 animate-pulse"
            style={{ width: "48px", height: "48px", minWidth: "48px" }}
          />
          
          {/* Name and text skeleton */}
          <div className="flex-grow-1 d-none d-lg-block">
            <div 
                className="bg-secondary bg-opacity-10 rounded animate-pulse mb-2" 
                style={{ height: "16px", width: "60%" }} 
            />
            <div 
                className="bg-secondary bg-opacity-10 rounded animate-pulse" 
                style={{ height: "12px", width: "40%" }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersLoadingSkeleton;
