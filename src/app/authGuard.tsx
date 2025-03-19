import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuthProtection = (WrappedComponent: React.FC) => {
  return function ProtectedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSuccessfulSignIn = (role: string) => {
      switch (role) {
        case "Landlord":
          router.replace("/all-properties");
          break;
        default:
          null;
      }
    };

    useEffect(() => {
      if (status === "authenticated" && session?.user) {
        if (session?.user?.role) {
          handleSuccessfulSignIn(session.user.role);
        }
      }
    }, [status, router]);

    if (status === "loading" || session) return null; // Prevent page rendering

    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
