import { Layout } from "@/components/Layout";
import { Navigate, Outlet, RouteObject } from "react-router-dom";

const Public: React.FC<{}> = ({}) => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export const publicRoutes: RouteObject[] = [
    {
        element: <Public />,
        children: [
            { path: "/", element: <>Public</> },
            {
                path: "*",
                element: <div>Not found</div>,
            },
        ],
    },
];
