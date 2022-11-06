import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";

export const Protected: React.FC<{}> = ({}) => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export const protectedRoutes = [
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
