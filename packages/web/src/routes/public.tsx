import { Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const publicRoutes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    { path: "*", element: <Navigate to={`/login`} /> }
];
