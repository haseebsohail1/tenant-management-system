import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "loading") return;
      if (!session) signIn();
    }, [session, status]);

    if (!session) {
      return null;
    }
    return <Component {...props} />;
  };
}
