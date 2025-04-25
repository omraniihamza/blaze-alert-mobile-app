
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { useNotifications } from "@/contexts/NotificationContext";
import MobileNavigation from "@/components/MobileNavigation";
import { toast } from "sonner";

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { requestPermission, permissionStatus } = useNotifications();
  
  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (!granted) {
      toast.error("Please allow notifications in your browser settings", {
        description: "You may need to check your browser settings to enable notifications"
      });
    }
  };

  return (
    <div className="mobile-screen">
      <header className="mobile-header">
        <h1 className="text-xl font-bold">Settings</h1>
      </header>
      
      <main className="mobile-content pb-20">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the app looks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive fire alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts even when the app is closed
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={permissionStatus === "granted"}
                  disabled={permissionStatus === "denied"}
                  onCheckedChange={() => {
                    if (permissionStatus !== "granted") {
                      handleRequestPermission();
                    }
                  }}
                />
              </div>
              
              {permissionStatus === "denied" && (
                <div className="bg-muted p-3 rounded-md text-sm">
                  <p className="font-medium">Notifications are blocked</p>
                  <p className="text-muted-foreground mt-1">
                    You'll need to allow notifications in your browser settings
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleRequestPermission}
                  >
                    Try Again
                  </Button>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-priority">High Priority Only</Label>
                  <p className="text-sm text-muted-foreground">
                    Only receive alerts for high intensity fires
                  </p>
                </div>
                <Switch
                  id="high-priority"
                  defaultChecked={false}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Blaze Alert</span> v1.0.0
                </p>
                <p className="text-sm text-muted-foreground">
                  A mobile app for fire detection alerts with push notifications
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="mobile-footer">
        <MobileNavigation />
      </footer>
    </div>
  );
};

export default SettingsPage;
