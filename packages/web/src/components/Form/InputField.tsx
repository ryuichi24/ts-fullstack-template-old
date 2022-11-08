import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    type?: "text" | "email" | "password";
    className?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    type = "text",
    className = "",
    ...props
}) => {
    return (
        <div className={className}>
            <label htmlFor={props.name} className="block text-sm font-medium text-gray-500">
                {props.name}
            </label>
            <input
                type={type}
                className={`w-full mt-2 py-3 px-3 rounded-lg bg-white border border-gray-300 text-gray-500 focus:border-indigo-500 focus:outline-none`}
                {...props}
            />
        </div>
    );
};
