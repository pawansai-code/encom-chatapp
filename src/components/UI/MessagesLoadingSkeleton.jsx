const MessagesLoadingSkeleton = () => {
  return (
    <div className="flex-grow-1 overflow-auto p-4">
      {[...Array(6)].map((_, idx) => (
        <div
          key={idx}
          className={`d-flex mb-4 ${
            idx % 2 === 0 ? "justify-content-start" : "justify-content-end"
          }`}
        >
          <div className="d-flex flex-column gap-1" style={{ maxWidth: "50%" }}>
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-secondary bg-opacity-25 animate-pulse"
                style={{ width: "32px", height: "32px" }}
              />
              <div className="d-flex flex-column gap-1">
                <div
                  className="rounded bg-secondary bg-opacity-25 animate-pulse"
                  style={{ width: "120px", height: "16px" }}
                />
              </div>
            </div>
            <div
              className="rounded bg-secondary bg-opacity-25 animate-pulse p-4"
              style={{ height: "60px", width: "200px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesLoadingSkeleton;
