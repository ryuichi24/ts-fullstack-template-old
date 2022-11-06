import React from "react";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes: React.FC<{}> = ({}) => {
    const isAuthenticated = true;
    const routes = isAuthenticated ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes]);
    return <>{element}</>;
};
