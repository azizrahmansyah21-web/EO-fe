"use client";

import { useState } from "react";
import { AdminSettingsTemplate } from "@/components/templates/admin-settings-template";

/**
 * SettingsPage (Page Controller)
 * Manages global settings state and delegates rendering to AdminSettingsTemplate.
 */
export default function SettingsPage() {
  const [brandName, setBrandName] = useState("Agung Toyota");
  const [supportWa, setSupportWa] = useState("0812-7561-9011");
  const [autoCloseQuota, setAutoCloseQuota] = useState(true);
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    // Simulate saving to backend API
    setTimeout(() => {
      setLoading(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 700);
  };

  return (
    <AdminSettingsTemplate
      brandName={brandName}
      onBrandNameChange={setBrandName}
      supportWa={supportWa}
      onSupportWaChange={setSupportWa}
      autoCloseQuota={autoCloseQuota}
      onAutoCloseQuotaChange={setAutoCloseQuota}
      onSubmit={handleSubmit}
      isLoading={loading}
      savedSuccess={savedSuccess}
    />
  );
}
