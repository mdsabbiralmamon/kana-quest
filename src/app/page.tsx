'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const Page = () => {
  const handleLogout = async () => {
    signOut();
  };

  const { data: session } = useSession();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <h1>Welcome to Your App</h1>
      <h2>{session?.user?.name}</h2>
      <h3>{session?.user?.email}</h3>
      <h4>{session?.user?.role}</h4>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Page;
