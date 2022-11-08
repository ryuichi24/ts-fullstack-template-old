import React from "react";
import { Spinner } from "../Spinner";

const variants = {
    primary: "bg-indigo-600 text-white",
    danger: "bg-red-600 text-white",
};

const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-2 px-6 text-md",
    lg: "py-3 px-8 text-lg",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    isLoading?: boolean;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    isLoading,
    ...props
}) => {
    return (
        <button
            className={`${className} ${variants[variant]} ${sizes[size]} hover:opacity-80 border border-gray-300 rounded-md`}
            {...props}
        >
            {isLoading ? <Spinner /> : <span>{children}</span>}
        </button>
    );
};
