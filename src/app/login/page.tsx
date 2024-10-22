"use client"; // Client Component

import React, { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const response = await fetch("/api/login/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // No role is being sent anymore
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        const userRole = data.role; // Get role from response

        // Redirect based on user role
        if (userRole === "ADMIN") {
          window.location.href = "../admin-dashboard";
        } else if (userRole === "MANAGER") {
          window.location.href = "../manager-dashboard";
        } else {
          window.location.href = "../home";
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/login.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      <div className="w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-md relative z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-blue-600 hover:underline">
            Register Here?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
