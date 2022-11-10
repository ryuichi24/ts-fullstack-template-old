import { ConfirmEmail } from "@/pages/ConfirmEmail";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Navigate, RouteObject } from "react-router-dom";

export const publicRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/confirm-email",
        element: <ConfirmEmail />,
    },
    { path: "*", element: <Navigate to={`/login`} /> },
];
