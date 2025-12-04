"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenManager } from "@/services/api.service";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = tokenManager.getAccessToken();

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
