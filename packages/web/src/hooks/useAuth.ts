import { useEffect } from "react";
import { useAuthContext } from "@/contexts/authContext";
import { useCheckAuthQuery } from "@/__generated__/graphql";

export const useAuth = () => {
    const { user, setUser } = useAuthContext();
    const { data, loading } = useCheckAuthQuery();

    useEffect(() => {
        if (!loading && !data?.checkAuth?.user) {
            setUser(null);
        }

        if (!loading && data?.checkAuth?.user) {
            setUser({ ...data?.checkAuth.user });
        }
    }, [loading, setUser, data?.checkAuth?.user]);

    return { user, setUser, loading };
};
