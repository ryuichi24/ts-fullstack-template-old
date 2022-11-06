import React from "react";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div>layout</div>
            <div>{children}</div>
        </>
    );
};
