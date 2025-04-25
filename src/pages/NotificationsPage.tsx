
import React from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import NotificationCard from "@/components/NotificationCard";
import MobileNavigation from "@/components/MobileNavigation";
import { Button } from "@/components/ui/button";

const NotificationsPage = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    clearAll, 
    unreadCount 
  } = useNotifications();

  return (
    <div className="mobile-screen">
      <header className="mobile-header">
        <h1 className="text-xl font-bold">Notifications</h1>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>
      </header>
      
      <main className="mobile-content pb-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">No Notifications</h2>
            <p className="text-muted-foreground">
              You don't have any fire alerts at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={() => markAsRead(notification.id)}
              />
            ))}
          </div>
        )}
      </main>
      
      <footer className="mobile-footer">
        <MobileNavigation />
      </footer>
    </div>
  );
};

export default NotificationsPage;
