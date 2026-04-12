"use client";

import { useState, useEffect } from "react";
import { AuthGate } from "@/components/dispatch/auth-gate";
import { Dashboard } from "@/components/dispatch/dashboard";

export default function DispatchPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("dispatch_auth");
    if (saved === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleAuth = () => {
    localStorage.setItem("dispatch_auth", "true");
    setAuthenticated(true);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <AuthGate onAuth={handleAuth} />;
  }

  return <Dashboard />;
}
