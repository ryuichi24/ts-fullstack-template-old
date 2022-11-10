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
        path: "/app",
        element: <Protected />,
        children: [
            { path: "/app/", element: <div>Protected</div> },
            { path: "/app/profile", element: <div>Profile</div> },
        ],
    },
    { path: "*", element: <Navigate to={`/app`} /> },
];
