
import React from "react";
import { FireNotification } from "@/contexts/NotificationContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  notification: FireNotification;
  onMarkAsRead: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const { title, description, location, intensity, timestamp, read, safetyTips } = notification;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "high":
        return "bg-alert text-alert-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-notify text-notify-foreground";
      default:
        return "bg-accent text-accent-foreground";
    }
  };

  return (
    <Card 
      className={cn(
        "notification-item", 
        !read && "border-l-4 border-primary",
        intensity === "high" && "notification-alert",
        intensity === "medium" && "notification-warning",
        intensity === "low" && "notification-info"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={getIntensityColor(intensity)}>
            {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
          </Badge>
        </div>
        <CardDescription className="flex justify-between">
          <span>{location}</span>
          <span>{formatTime(timestamp)}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="mb-2">{description}</p>
        
        {safetyTips && safetyTips.length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold text-sm">Safety Tips:</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {safetyTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      {!read && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full text-sm" 
            onClick={onMarkAsRead}
          >
            Mark as Read
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCard;
