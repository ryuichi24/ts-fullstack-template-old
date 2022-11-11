import { Layout } from "@/components/Layout";
import { Outlet, RouteObject } from "react-router-dom";
import { ConfirmEmail } from "@/features/auth/pages/ConfirmEmail";
import { Login } from "@/features/auth/pages/Login";
import { Register } from "@/features/auth/pages/Register";

const Auth: React.FC<{}> = ({}) => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export const authRoutes: RouteObject[] = [
    {
        element: <Auth />,
        children: [
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
        ],
    },
];
