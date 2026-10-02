"use client";

import { useState } from "react";
import { AdminLoginTemplate } from "@/components/templates/admin-login-template";
import { AuthService } from "@/lib/api/auth-service";

/**
 * LoginPage (Admin Command Center Login Controller)
 * Manages admin authentication state, interacts with AuthService, and delegates rendering to AdminLoginTemplate.
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthService.loginAdmin({
        email,
        password,
        remember: rememberDevice,
      });
      window.location.href = "/admin/dashboard";
    } catch (err: any) {
      console.error("[Login Error]", err);
    } finally {
      setLoading(false);
    }
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
