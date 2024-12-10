'use client';

import Image from 'next/image';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    const navlinks = [{
        name: 'Home',
        link: '/'
    }, {
        name: 'Lessons',
        link: '/pages/lessons'
    }, {
        name: 'Tutorials',
        link: '/tutorials'
    }];

    const handleLogout = async () => {
        signOut();
    };

    const { data: session } = useSession();

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navlinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.link}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.link}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {session?.user?.photo ? (
                                <Image src={session.user.photo} width={100} height={100} alt="Profile Picture" />
                            ) : (
                                <Image src="/default-avatar.jpg" width={100} height={100} alt="Default Avatar" />
                            )}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href={"/dashboard"} className="justify-between">
                                Dashboard
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;