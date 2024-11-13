"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/appwrite";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        router.push("/register");
      }
    };

    authenticate();
  }, [router]);
}
