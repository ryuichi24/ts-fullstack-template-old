import React from "react";
import { Avatar } from "../Avatar";

type NavbarProps = {};

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <nav className="py-5 border border-b">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="font-semibold">Logo</div>
                <div>
                    <ul>
                        <li>
                            <Avatar username={'john@email.com'} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
