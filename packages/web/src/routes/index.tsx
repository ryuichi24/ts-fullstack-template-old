import React from "react";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "@/routes/protected";
import { publicRoutes } from "@/routes/public";

export const AppRoutes: React.FC<{}> = ({}) => {
    const isAuthenticated = true;
    const routes = isAuthenticated ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes]);
    return <>{element}</>;
};
