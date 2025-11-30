import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileEdit, Menu, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export const Navbar = ({ isAuthenticated: propIsAuth, userName: propUserName }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated: authIsAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Use auth context if available, otherwise use props
  const isAuthenticated = authIsAuthenticated || propIsAuth;
  const userName = user?.fullName?.split(' ')[0] || propUserName || "User";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md">
              <FileEdit className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ResumeForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/my-resumes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  My Resumes
                </Link>
                <Link to="/portfolio-editor" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      {userName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Preferences</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="gradient-accent text-white shadow-accent">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-resumes"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Resumes
                </Link>
                <Link
                  to="/portfolio-editor"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm font-medium mb-2">{userName}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full gradient-accent text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
