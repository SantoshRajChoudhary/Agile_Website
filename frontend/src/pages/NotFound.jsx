import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center bg-glow">
        <div className="section-container text-center py-20">
          <h1 className="font-display text-8xl md:text-9xl font-bold text-primary text-glow mb-4">
            404
          </h1>

          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Button size="lg" asChild>
            <Link to="/">
              <Home className="mr-2" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
