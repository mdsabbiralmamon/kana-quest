'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Fetching Data..!</h1>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <img
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg"
            src={user.photo || '/default-avatar.jpg'}
            alt={`${user.name || 'User'}'s avatar`}
          />
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">{user.name || 'User Name'}</h1>
          <p className="text-gray-600 text-center mt-2">{user.email}</p>
          <p className="text-indigo-500 text-center mt-1 capitalize">{user.role || 'User'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
