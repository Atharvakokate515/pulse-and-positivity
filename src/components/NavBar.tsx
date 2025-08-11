import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { useUser } from '@/context/UserContext';
import { Home, User, LogOut, Activity } from 'lucide-react';

export const NavBar: React.FC = () => {
  const { logout, userProfile, isAuthenticated } = useUser();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">FitTracker</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/home">
              <Button 
                variant={isActive('/home') ? 'motivational' : 'ghost'}
                size="sm"
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            
            <Link to="/profile">
              <Button 
                variant={isActive('/profile') ? 'motivational' : 'ghost'}
                size="sm"
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            
            <Button 
              variant="soft" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/home">
              <Button variant={isActive('/home') ? 'motivational' : 'ghost'} size="icon">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/profile">
              <Button variant={isActive('/profile') ? 'motivational' : 'ghost'} size="icon">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            
            <Button variant="soft" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};