import { Layout } from "@/components/Layout";
import { Outlet, RouteObject } from "react-router-dom";

const Common: React.FC<{}> = ({}) => {
    return (
        <>
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
};

export const commonRoutes: RouteObject[] = [{
    path: "/",
    element: <Common />,
    children: [
        { path: '/', element: <>common</> }
    ]
}];
