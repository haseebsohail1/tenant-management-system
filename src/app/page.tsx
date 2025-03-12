// Home.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (status === "loading") {
        return;
      }
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/auth/signin");
      }
      setLoading(false);
    };

    checkAuth();
  }, [session, status, router]);

  if (loading) {
    return <Loader />;
  }

  return null;
}
