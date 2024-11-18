"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { checkAuth } from "@/utils/appwrite";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const isAuthenticated = await checkAuth();
        if (isAuthenticated) {
          router.push("/home/wallet");
        } else {
          router.push("/register");
        }
      } catch (error) {
        console.error("Error during authentication", error);
        router.push("/register");
      }
    };

    authenticate();
  }, [router]);

  return null;
}
