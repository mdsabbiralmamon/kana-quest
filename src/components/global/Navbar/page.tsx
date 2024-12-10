'use client';

import Image from 'next/image';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    const navlinks = [
        { name: 'Home', link: '/' },
        { name: 'Lessons', link: '/pages/lessons' },
        { name: 'Tutorials', link: '/pages/tutorials' },
    ];

    const { data: session } = useSession();

    const handleLogout = async () => {
        signOut();
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link href="/" className="hover:text-blue-400 transition">
                        Kana-Quest
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex space-x-8">
                    {navlinks.map((link, index) => (
                        <Link key={index} href={link.link} className="hover:text-blue-400 transition">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* User Profile / Dropdown */}
                <div className="relative">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {session?.user?.photo ? (
                                    <Image src={session.user.photo} width={40} height={40} alt="Profile Picture" />
                                ) : (
                                    <Image src="/default-avatar.jpg" width={40} height={40} alt="Default Avatar" />
                                )}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-gray-800 rounded-box w-52"
                        >
                            <li>
                                <Link href="/dashboard" className="justify-between">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings">Settings</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-left w-full">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
