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

  const handleSuccessfulSignIn = (role: string) => {
    switch (role) {
      case "Admin":
        router.push("/dashboard");
        break;
      case "Landlord":
        router.push("/properties");
        break;
      case "Tenant":
        router.push("/tenants");
        break;
      case "Manager":
        router.push("/tenants");
        break;
      default:
        null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (status === "loading") {
        return;
      }
      if (session) {
        if (session?.user && session?.user?.role) {
          handleSuccessfulSignIn(session.user.role);
        }
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
