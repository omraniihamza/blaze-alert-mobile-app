
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import MobileNavigation from "@/components/MobileNavigation";
import NotificationCard from "@/components/NotificationCard";

const HomePage = () => {
  const { currentUser } = useAuth();
  const { notifications, markAsRead, requestPermission, permissionStatus, unreadCount } = useNotifications();
  
  // Request notification permissions on component mount
  useEffect(() => {
    if (permissionStatus !== 'granted' && 'Notification' in window) {
      const timer = setTimeout(() => {
        toast.info("Enable notifications for fire alerts", {
          description: "Stay informed about fire incidents in your area",
          action: {
            label: "Enable",
            onClick: () => requestPermission()
          }
        });
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [permissionStatus, requestPermission]);

  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="mobile-screen">
      <header className="mobile-header">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="text-alert mr-2">Blaze</span> Alert
        </h1>
        {unreadCount > 0 && (
          <Link to="/notifications">
            <Button variant="ghost" size="sm" className="relative">
              <span>Alerts</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-alert text-[10px] text-white">
                {unreadCount}
              </span>
            </Button>
          </Link>
        )}
      </header>
      
      <main className="mobile-content pb-20">
        <section className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                Welcome{currentUser?.email ? `, ${currentUser.email.split('@')[0]}` : ''}
              </CardTitle>
              <CardDescription>
                Stay informed about fire incidents in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-4">
                <div className="w-24 h-24 rounded-full bg-alert/20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-alert/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-alert flex items-center justify-center text-white font-bold">
                      {unreadCount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="font-semibold text-lg">
                  {unreadCount === 0 
                    ? "No active fire alerts" 
                    : `${unreadCount} Active Fire Alert${unreadCount !== 1 ? 's' : ''}`
                  }
                </h3>
                <p className="text-sm text-muted-foreground">
                  {unreadCount === 0 
                    ? "Your area is currently safe" 
                    : "Check details for safety information"
                  }
                </p>
                
                {unreadCount > 0 && (
                  <Button 
                    className="mt-2" 
                    variant="default"
                    size="sm"
                    asChild
                  >
                    <Link to="/notifications">View All Alerts</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </section>
        
        {recentNotifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsRead(notification.id)}
                />
              ))}
              
              {notifications.length > 3 && (
                <div className="text-center mt-2">
                  <Button variant="outline" asChild>
                    <Link to="/notifications">View All Alerts</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Fire Safety Tips</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-alert/20 text-alert p-1 rounded">•</span>
                  <span>Create and practice a fire escape plan with your family</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-alert/20 text-alert p-1 rounded">•</span>
                  <span>Install smoke alarms on every level of your home</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-alert/20 text-alert p-1 rounded">•</span>
                  <span>Keep a fire extinguisher in accessible locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-alert/20 text-alert p-1 rounded">•</span>
                  <span>Prepare an emergency kit with essentials</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <footer className="mobile-footer">
        <MobileNavigation />
      </footer>
    </div>
  );
};

export default HomePage;
