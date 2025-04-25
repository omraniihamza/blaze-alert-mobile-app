
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Bell, Home, Settings, User } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

const MobileNavigation = () => {
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-6 w-6" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: (
        <div className="relative">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-alert text-[10px] text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
      ),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-6 w-6" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-6 w-6" />,
    },
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-1 flex-col items-center justify-center py-2 text-xs",
            location.pathname === item.path
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.icon}
          <span className="mt-1">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNavigation;
