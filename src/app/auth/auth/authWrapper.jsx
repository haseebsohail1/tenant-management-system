import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) signIn();
  }, [session, status]);

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

export default AuthWrapper;
