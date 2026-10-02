"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SalesLoginTemplate } from "@/components/templates/sales-login-template";
import { AuthService } from "@/lib/api/auth-service";

/**
 * SalesLoginPage (Sales Consultant Login Controller)
 * Manages sales credentials state, interacts with AuthService, and delegates UI presentation to SalesLoginTemplate.
 */
export default function SalesLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthService.loginSales({
        nik,
        password,
        remember: rememberMe,
      });
      router.push("/sales");
    } catch (err: any) {
      console.error("[Sales Login Error]", err);
    } finally {
      setLoading(false);
    }
  };

  const isValid = nik.trim() !== "" && password.trim() !== "";

  return (
    <SalesLoginTemplate
      nik={nik}
      onNikChange={setNik}
      password={password}
      onPasswordChange={setPassword}
      rememberMe={rememberMe}
      onRememberMeChange={setRememberMe}
      onSubmit={handleSubmit}
      isLoading={loading}
      isValid={isValid}
    />
  );
}
