/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-key */
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutMutation, CheckAuthDocument } from "@/__generated__/graphql";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu } from "../Elements/DropdownMenu";
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
    const { setUser, user } = useAuth();

    const handleLogoutBtnClick = async () => {
        await logout();
        setUser(null);
        navigate("/login", { replace: true });
    };

    return (
        <nav className="py-5 border border-b">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="font-semibold">
                    <Link to={"/"}>Logo</Link>
                </div>
                <div>
                    <ul className="flex items-center justify-between">
                        {user ? (
                            <>
                                <li className="mr-6">
                                    <Link to={"/home"}>Home</Link>
                                </li>
                                <DropdownMenu
                                    clickTarget={<Avatar username={user.email!} />}
                                    menuItems={[
                                        <button className="w-full h-hull text-start">
                                            item 1
                                        </button>,
                                        <button className="w-full h-hull text-start">
                                            <Link to={"/profile"}>Profile</Link>
                                        </button>,
                                        <button
                                            className="w-full h-hull text-start"
                                            onClick={handleLogoutBtnClick}
                                        >
                                            logout
                                        </button>,
                                    ]}
                                />
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={"/login"}>Sign In</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
