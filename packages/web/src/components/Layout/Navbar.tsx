/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAuth } from "@/hooks/useAuth";
import { CheckAuthDocument, useLogoutMutation } from "@/__generated__/graphql";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../Avatar";

type NavbarProps = {};

export const Navbar: React.FC<NavbarProps> = ({}) => {
    // https://zenn.dev/kazu777/articles/b64935ea7d6fee#%E8%87%AA%E5%8B%95%E3%81%A7%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84%E5%87%A6%E7%90%86
    const [logout] = useLogoutMutation({
        update(cache, { data }) {
            cache.writeQuery({
                query: CheckAuthDocument,
                data: { checkAuth: null },
            });
        },
    });
    const navigate = useNavigate();
    const { setUser } = useAuth();
    // https://v1.tailwindcss.com/course/positioning-the-dropdown-area#app
    const [isMenuActive, setIsMenuActive] = useState(false);
    return (
        <nav className="py-5 border border-b">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="font-semibold">Logo</div>
                <div>
                    <ul className="flex items-center justify-between">
                        <li className="relative">
                            <button className="relative z-10" onClick={() => setIsMenuActive(!isMenuActive)}>
                                <Avatar username={"john@email.com"} />
                            </button>
                            {isMenuActive ? (
                                <>
                                    <button
                                        className="fixed inset-0 h-full w-full bg-black opacity-20 cursor-default"
                                        tabIndex={-1}
                                        onClick={() => setIsMenuActive(!isMenuActive)}
                                    ></button>
                                    <div
                                        id="dropdownNavbar"
                                        className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
                                    >
                                        <ul>
                                            <li className="cursor-pointer px-4 py-2 text-gray-800 hover:text-white hover:bg-indigo-500">
                                                item 1
                                            </li>
                                            <li className="cursor-pointer px-4 py-2 text-gray-800 hover:text-white hover:bg-indigo-500">
                                                item 2
                                            </li>
                                            <li
                                                className="cursor-pointer px-4 py-2 text-red-400 hover:text-white hover:bg-indigo-500"
                                                onClick={async () => {
                                                    await logout();
                                                    setUser(null);
                                                    navigate("/login", { replace: true });
                                                }}
                                            >
                                                logout
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : null}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
