import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuthProtection = (WrappedComponent: React.FC) => {
    return function ProtectedComponent(props: any) {
        const { data: session, status } = useSession();
        const router = useRouter();

        useEffect(() => {
            if (status === "authenticated") {
                router.replace("/dashboard"); // Redirect to home or dashboard
            }
        }, [status, router]);

        if (status === "loading" || session) return null; // Prevent page rendering

        return <WrappedComponent {...props} />;
    };
};

export default withAuthProtection;
