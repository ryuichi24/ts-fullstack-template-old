/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";

type DropdownMenuProps = {
    clickTarget: React.ReactNode;
    menuItems: React.ReactNode[];
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ menuItems, clickTarget }) => {
    // https://v1.tailwindcss.com/course/positioning-the-dropdown-area#app
    const [isMenuActive, setIsMenuActive] = useState(false);
    return (
        <>
            <li className="relative">
                <button className="relative z-10" onClick={() => setIsMenuActive(!isMenuActive)}>
                    {clickTarget}
                </button>
                {isMenuActive ? (
                    <>
                        <button
                            className="fixed inset-0 h-full w-full cursor-default"
                            tabIndex={-1}
                            onClick={() => setIsMenuActive(!isMenuActive)}
                        ></button>
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                            <ul>
                                {menuItems.map((menuItem, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer rounded-lg px-4 py-2 text-gray-800 hover:text-white hover:bg-indigo-500"
                                    >
                                        {menuItem}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : null}
            </li>
        </>
    );
};
