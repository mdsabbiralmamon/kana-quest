'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { RxAvatar } from 'react-icons/rx';
import { MdPostAdd } from 'react-icons/md';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Profile Manager', href: '/dashboard', icon: <RxAvatar /> },
    { name: 'User Manager', href: '/dashboard/users', icon: <FaUser /> },
    { name: 'Lesson Manager', href: '/dashboard/lessons', icon: <MdPostAdd /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for large screens */}
      <aside
        className={`hidden lg:block ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 text-white transition-all duration-300 shadow-lg`}
      >
        <div
          className="p-4 flex items-center justify-between cursor-pointer bg-gray-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="text-2xl font-bold">
            {isSidebarOpen ? 'KD Dashboard' : 'KD'}
          </span>
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="hover:bg-gray-600">
                <Link href={item.href}>
                  <ul
                    className={`py-3 px-4 flex items-center space-x-4 transition-all duration-200 ${
                      isSidebarOpen ? 'justify-start' : 'justify-center'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isSidebarOpen && <span className="text-sm">{item.name}</span>}
                  </ul>
                </Link>
              </li>
            ))}
            {/* Logout Button */}
            <li className="hover:bg-gray-600 cursor-pointer" onClick={() => signOut({ callbackUrl: '/pages/signin' })}>
              <ul
                className={`py-3 px-4 flex items-center space-x-4 transition-all duration-200 ${
                  isSidebarOpen ? 'justify-start' : 'justify-center'
                }`}
              >
                <span className="text-lg">
                  <FiLogOut />
                </span>
                {isSidebarOpen && <span className="text-sm">Logout</span>}
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Sidebar for small screens (smooth sliding transition) */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 text-white shadow-lg lg:hidden transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center justify-between bg-gray-700">
          <span className="text-2xl font-bold">KD Dashboard</span>
          <AiOutlineClose
            size={24}
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="hover:bg-gray-600">
                <Link href={item.href}>
                  <ul className="py-3 px-4 flex items-center space-x-4">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </ul>
                </Link>
              </li>
            ))}
            {/* Logout Button */}
            <li className="hover:bg-gray-600 cursor-pointer" onClick={() => signOut({ callbackUrl: '/pages/signin' })}>
              <ul className="py-3 px-4 flex items-center space-x-4">
                <span className="text-lg">
                  <FiLogOut />
                </span>
                <span className="text-sm">Logout</span>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Hamburger Menu */}
      {!isSidebarOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <AiOutlineMenu
            size={24}
            className="cursor-pointer text-gray-800"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-6 bg-gradient-to-b from-gray-100 to-gray-200 ${
          isSidebarOpen ? '' : ''
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;