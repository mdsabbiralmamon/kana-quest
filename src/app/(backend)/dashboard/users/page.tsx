'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin'; 
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1); // Track the current page
  const [totalPages, setTotalPages] = useState<number>(1); // Track the total number of pages

  // Fetch users from the API
  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/users?page=${page}&limit=10`);
      const data = await res.json();

      if (res.ok && data.serverStatus === 'Success') {
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages); // Set the total pages from the response
      } else {
        setError('Failed to fetch users.');
      }
    } catch (err) {
      setError(`An error occurred while fetching users: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Promote a user to admin
  const promoteUser = async (userId: string) => {
    try {
      const res = await fetch('/api/users/promote', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      
      if (res.ok) {
        fetchUsers(page);
        Swal.fire({
          icon: 'success',
          title: 'User Promoted!',
          text: 'The user has been successfully promoted to admin.',
        });
      } else {
        setError('Failed to promote user.');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to promote user. Try again.',
        });
      }
    } catch (err) {
      setError(`An error occurred while promoting the user: ${err}`);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while promoting the user.',
      });
    }
  };

  // Demote an admin to user
  const demoteUser = async (userId: string) => {
    try {
      const res = await fetch('/api/users/demote', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      
      if (res.ok) {
        fetchUsers(page);
        Swal.fire({
          icon: 'success',
          title: 'User Demoted!',
          text: 'The user has been successfully demoted to regular user.',
        });
      } else {
        setError('Failed to demote user.');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to demote user. Try again.',
        });
      }
    } catch (err) {
      setError(`An error occurred while demoting the user: ${err}`);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while demoting the user.',
      });
    }
  };

  // Delete a user
  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/delete?userId=${userId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        fetchUsers(page);
        Swal.fire({
          icon: 'success',
          title: 'User Deleted!',
          text: 'The user has been successfully deleted.',
        });
      } else {
        setError('Failed to delete user.');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete user. Try again.',
        });
      }
    } catch (err) {
      setError(`An error occurred while deleting the user: ${err}`);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while deleting the user.',
      });
    }
  };

  // Fetch users on component mount and when the page changes
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Role</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                <td className="px-4 py-2 border border-gray-300 space-x-2">
                  {user.role === 'user' ? (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                      onClick={() => promoteUser(user._id)}
                    >
                      Promote to Admin
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      onClick={() => demoteUser(user._id)}
                    >
                      Demote to User
                    </button>
                  )}
                  <button
                    className={`${
                      user.role === 'admin' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
                    } text-white px-4 py-1 rounded`}
                    onClick={() => deleteUser(user._id)}
                    disabled={user.role === 'admin'}
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-l-md"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="px-4 py-2">{page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-r-md"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagementPage;
