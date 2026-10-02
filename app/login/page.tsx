"use client";

import { useState } from "react";
import { AdminLoginTemplate } from "@/components/templates/admin-login-template";

/**
 * LoginPage (Admin Command Center Login Controller)
 * Manages admin authentication state and delegates rendering to AdminLoginTemplate.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/admin/dashboard";
    }, 1000);
  };

  return (
    <AdminLoginTemplate
      email={email}
      onEmailChange={setEmail}
      password={password}
      onPasswordChange={setPassword}
      rememberDevice={rememberDevice}
      onRememberDeviceChange={setRememberDevice}
      onSubmit={handleSubmit}
      isLoading={loading}
    />
  );
}
