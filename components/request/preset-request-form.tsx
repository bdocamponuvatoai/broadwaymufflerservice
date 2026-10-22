"use client";

import { useSearchParams } from "next/navigation";

import { RequestForm } from "@/components/request/request-form";

/** Reads `?service=` so links from service pages arrive with that service chosen. */
export function PresetRequestForm() {
  const service = useSearchParams().get("service") ?? "";
  return <RequestForm key={service} initialService={service} />;
}
