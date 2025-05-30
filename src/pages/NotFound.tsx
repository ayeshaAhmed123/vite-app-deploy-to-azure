
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="container py-24 flex flex-col items-center">
        <h1 className="text-9xl font-bold text-health-300">404</h1>
        <h2 className="text-3xl font-semibold mt-6 mb-3">Page Not Found</h2>
        <p className="text-muted-foreground text-lg text-center max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or no longer exists.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild>
            <Link to="/providers">Find Providers</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
