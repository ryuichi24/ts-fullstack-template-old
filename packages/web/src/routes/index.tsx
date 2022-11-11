import React from "react";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "@/routes/protected";
import { useAuth } from "@/hooks/useAuth";
import { authRoutes } from "@/features/auth/routes";
import { publicRoutes } from "./public";

export const AppRoutes: React.FC<{}> = ({}) => {
    const { user, loading } = useAuth();
    const isAuthenticated = !!user;
    const routes = isAuthenticated ? protectedRoutes : authRoutes;
    const element = useRoutes([...routes, ...publicRoutes]);

    if (loading) {
        return <div>loading...</div>;
    }

    return <>{element}</>;
};
