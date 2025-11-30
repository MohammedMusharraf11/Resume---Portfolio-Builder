import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center animate-scale-in">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center shadow-xl animate-pulse">
              <FileQuestion className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-accent/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-8xl sm:text-9xl font-display font-bold mb-6 gradient-hero bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button 
              size="lg" 
              className="gradient-primary text-white shadow-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.history.back()}
            className="border-2 hover:bg-card hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
          >
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-16 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl">
          <p className="text-sm text-muted-foreground">
            Need help? Try these popular pages:
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Link to="/login" className="text-sm text-primary hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-sm text-primary hover:underline">
              Sign Up
            </Link>
            <Link to="/dashboard" className="text-sm text-primary hover:underline">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
