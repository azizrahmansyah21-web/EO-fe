"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SalesLoginTemplate } from "@/components/templates/sales-login-template";

/**
 * SalesLoginPage (Sales Consultant Login Controller)
 * Manages sales credentials state and delegates UI presentation to SalesLoginTemplate.
 */
export default function SalesLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sales authentication
    setTimeout(() => {
      setLoading(false);
      router.push("/sales");
    }, 1000);
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
