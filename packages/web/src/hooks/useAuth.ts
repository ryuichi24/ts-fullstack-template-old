import { useEffect } from "react";
import { useAuthContext } from "@/contexts/authContext";
import { useCheckAuthQuery } from "@/__generated__/graphql";

export const useAuth = () => {
    const { user, setUser } = useAuthContext();
    const { data, loading, error } = useCheckAuthQuery();

    useEffect(() => {
        if (!loading && error) {
            setUser(null);
        }

        if (!loading && data?.checkAuth?.user) {
            setUser({ ...data?.checkAuth.user });
        }
    }, [loading, setUser, data?.checkAuth?.user, error]);

    return { user, setUser, loading };
};
