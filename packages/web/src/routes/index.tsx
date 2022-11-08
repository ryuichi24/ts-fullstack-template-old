import React from "react";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "@/routes/protected";
import { publicRoutes } from "@/routes/public";
import { useAuth } from "@/hooks/useAuth";

export const AppRoutes: React.FC<{}> = ({}) => {
    const { user, loading } = useAuth();
    const isAuthenticated = !!user;
    const routes = isAuthenticated ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes]);

    if(loading) return <>loading...</>
    return <>{element}</>;
};
