"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SalesGuestAddTemplate } from "@/components/templates/sales-guest-add-template";

/**
 * AddGuestPage (Page Controller)
 * Manages form state, submission logic, and delegates UI to SalesGuestAddTemplate.
 */
export default function AddGuestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push("/sales/guests");
    }, 1500);
  };

  const isValid = name.trim() !== "" && phone.trim() !== "";

  return (
    <SalesGuestAddTemplate
      name={name}
      onNameChange={setName}
      phone={phone}
      onPhoneChange={setPhone}
      onSubmit={handleSubmit}
      isLoading={loading}
      isValid={isValid}
    />
  );
}
