import { Layout } from "@/components/Layout";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

const Protected: React.FC<{}> = ({}) => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export const protectedRoutes: RouteObject[] = [
    {
        element: <Protected />,
        children: [
            { path: "/profile", element: <div>Profile</div> },
            { path: "/home", element: <div>Home</div> },
            // TODO: make it dynamic
            { path: "/login", element: <Navigate to={"/home"} /> },
            { path: "/register", element: <Navigate to={"/home"} /> },
            { path: "/confirm-email", element: <Navigate to={"/home"} /> },
        ],
    },
];
