import React from "react";

type AvatarProps = {
    username: string;
};

export const Avatar: React.FC<AvatarProps> = ({ username }) => {
    return (
        <>
            <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full cursor-pointer hover:opacity-80">
                <span className="font-medium text-gray-600">{username[0].toUpperCase()}</span>
            </div>
        </>
    );
};
