import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <Loader2 className="animate-spin" size={64} />
    </div>
  );
};

export default PageLoader;
