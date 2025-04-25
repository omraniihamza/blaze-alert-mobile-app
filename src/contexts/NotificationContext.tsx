
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Define interfaces for notifications
export interface FireNotification {
  id: string;
  title: string;
  description: string;
  location: string;
  intensity: "high" | "medium" | "low";
  timestamp: number;
  read: boolean;
  safetyTips: string[];
}

interface NotificationContextType {
  notifications: FireNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  requestPermission: () => Promise<boolean>;
  permissionStatus: NotificationPermission | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Sample mock notifications
const mockNotifications: FireNotification[] = [
  {
    id: "1",
    title: "Urgent: Wildfire Detected",
    description: "A wildfire has been detected near your area. Please stay alert.",
    location: "North Ridge, 3.2 miles from your location",
    intensity: "high",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    read: false,
    safetyTips: [
      "Stay indoors and close all windows",
      "Monitor local news for evacuation notices",
      "Prepare emergency supplies",
      "Keep pets indoors"
    ]
  },
  {
    id: "2",
    title: "Fire Alert: Containment Update",
    description: "The fire department is working to contain a fire in the downtown area.",
    location: "Downtown District, 5.7 miles from your location",
    intensity: "medium",
    timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
    read: false,
    safetyTips: [
      "Avoid downtown area if possible",
      "Follow detour instructions",
      "Keep windows closed to avoid smoke"
    ]
  },
  {
    id: "3",
    title: "Controlled Burn Notice",
    description: "A controlled burn is scheduled in the forest preserve.",
    location: "West Forest Preserve, 8.1 miles from your location",
    intensity: "low",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    read: true,
    safetyTips: [
      "No action needed",
      "This is a planned fire management activity"
    ]
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<FireNotification[]>(() => {
    const savedNotifications = localStorage.getItem("blazeAlertNotifications");
    return savedNotifications ? JSON.parse(savedNotifications) : mockNotifications;
  });
  
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | null>(null);

  useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem("blazeAlertNotifications", JSON.stringify(notifications));
    
    // Check notification permission on mount
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, [notifications]);

  // Add periodic mock notifications for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of a new notification
        const newNotification: FireNotification = {
          id: Date.now().toString(),
          title: `New Fire Alert: ${Math.floor(Math.random() * 100)}`,
          description: "A new fire incident has been reported in your area.",
          location: `${['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)]} District, ${(Math.random() * 10).toFixed(1)} miles from your location`,
          intensity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
          timestamp: Date.now(),
          read: false,
          safetyTips: [
            "Stay indoors if possible",
            "Monitor local news for updates",
            "Follow evacuation orders if issued"
          ]
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        
        // Show a toast for the new notification
        toast.warning("New fire alert received", {
          description: newNotification.title,
          action: {
            label: "View",
            onClick: () => {
              // User would navigate to notifications view here
            }
          }
        });
        
        // Show browser notification if permission granted
        if (permissionStatus === 'granted') {
          const notification = new Notification("Blaze Alert", {
            body: newNotification.title,
            icon: "/favicon.ico" // Use app favicon as notification icon
          });
          
          notification.onclick = () => {
            window.focus();
            // Navigate to notifications view
          };
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [permissionStatus]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      toast.error("Notifications not supported in this browser");
      return false;
    }
    
    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      
      if (permission === 'granted') {
        toast.success("Notification permission granted");
        return true;
      } else {
        toast.error("Notification permission denied");
        return false;
      }
    } catch (error) {
      toast.error("Error requesting notification permission");
      return false;
    }
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    requestPermission,
    permissionStatus
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
