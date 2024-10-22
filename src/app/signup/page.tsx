"use client"; // Client Component
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Link from "next/link";

const SignUp = () => {
  const router = useRouter(); // Initialize useRouter for navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "", // Add phone number to the form state
  });

  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send data to the backend API to be saved in MongoDB using Prisma
      const response = await fetch("/api/signup/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, role: "USER" }), // Assigning default role
      });

      // Check if MongoDB submission was successful
      if (response.ok) {
        console.log("Form data submitted to MongoDB via API");

        // Show success alert
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 3 seconds

        // Navigate to the login page after successful submission
        router.push("../../app/login"); // Redirect to your login page
      } else {
        const errorData = await response.json();
        console.error("Error submitting data to MongoDB:", errorData);
      }

      // Reset form data after submission
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneno: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/signup.jpg')", // Replace with your image URL
      }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-md relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        {/* Alert Box */}
        {alertVisible && (
          <div className="mb-4 p-4 text-green-800 bg-green-100 rounded-lg shadow-md">
            Data successfully sent!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
              placeholder="Enter your password"
            />
          </div>
          <Link href="../login">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Sign Up
            </button>
          </Link>
          <div className="flex justify-between mt-4 mb-4">
            <Link href="../login" className="text-blue-600 hover:underline">
              Already Registered?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
function setAlertVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}
