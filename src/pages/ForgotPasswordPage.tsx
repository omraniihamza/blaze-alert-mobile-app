
import React from "react";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  return (
    <div className="mobile-screen">
      <header className="mobile-header">
        <Link to="/login" className="flex items-center gap-1 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
        <div className="text-xl font-bold flex items-center justify-center">
          <span className="text-alert mr-1">Blaze</span> Alert
        </div>
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>
      
      <main className="mobile-content flex items-center justify-center">
        <ForgotPasswordForm />
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
