
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import MobileNavigation from "@/components/MobileNavigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="mobile-screen">
      <header className="mobile-header">
        <h1 className="text-xl font-bold">Profile</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </header>
      
      <main className="mobile-content pb-20">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-2">
                {currentUser?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <p className="text-sm text-muted-foreground">
                {currentUser?.email || "No email"}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <UpdateProfileForm />
      </main>
      
      <footer className="mobile-footer">
        <MobileNavigation />
      </footer>
    </div>
  );
};

export default ProfilePage;
