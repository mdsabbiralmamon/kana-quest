'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(""); // State for photo URL
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // For navigation after successful sign-up

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    try {
      const res = await fetch(`/api/public/users/signup`, {
        method: "POST",
        body: JSON.stringify({ name, email, password, photo }), // Include photo URL
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to sign up.");
      }

      // Success: Navigate to sign-in page
      router.push("/pages/signin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Now `error` is known to be an instance of `Error`
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>
        {error && (
          <p
            style={{
              color: "red",
              background: "#ffe6e6",
              padding: "8px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          required
        />
        <label htmlFor="photo">Profile Photo URL:</label>
        <input
          id="photo"
          type="url"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <a href="/pages/signin" style={{ color: "#0070f3", textDecoration: "none" }}>
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
