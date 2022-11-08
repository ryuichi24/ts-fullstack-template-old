import React from "react";

type WrapperProps = {
    children: React.ReactNode;
    maxWidth?: number;
    className?: string;
};

export const Wrapper: React.FC<WrapperProps> = ({ children, maxWidth = 800, className = "" }) => {
    return (
        <div className={`${className} m-auto w-full`} style={{ maxWidth: `${maxWidth}px` }}>
            {children}
        </div>
    );
};
