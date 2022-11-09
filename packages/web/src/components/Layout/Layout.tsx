import React from "react";
import { Navbar } from "./Navbar";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    );
};
