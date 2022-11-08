import { createContext, useContext, useState } from "react";

type AuthProviderProps = {
    children: React.ReactNode;
};

type User = {
    id?: string | null;
    email?: string | null;
    // role?: string;
};

const AuthContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
    user: null,
    setUser: () => ({}),
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
