import React, { useState } from "react";

const RegisterPage = () => {
const apiUrl = import.meta.env.VITE_API_URL;
;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
      try {
    const response = await fetch(`${apiUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setSuccess("Registration successful! You can now log in.");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  } catch (err) {
    setError(err.message);
  }

    // setSuccess("Registration successful! You can now log in.");
    // setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-10 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Create Your Account
        </h1>

        {error && (
          <div className="mb-6 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 text-green-700 bg-green-100 border border-green-300 rounded-md text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

