import React from "react";
import { Navbar } from "./Navbar";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="h-full flex flex-col justify-center">
            <div className="">
                <Navbar />
            </div>
            <div className="flex-grow"> {children}</div>
        </div>
    );
};
