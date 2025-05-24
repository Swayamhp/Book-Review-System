import React, { useState } from "react";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const Navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user, setUser } = useUser();
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setUser(data);
      setSuccess("Login successful!");
      Navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-10 p-10 bg-white rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>

        {error && (
          <div className="text-red-700 bg-red-100 p-4 rounded-lg text-lg text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="text-lg appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="text-lg appearance-none rounded-xl block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-3 block text-lg text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-lg">
              <a
                href="/forgot-password"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="text-lg w-full flex justify-center py-3 px-6 border border-transparent rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-gray-600 text-lg">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


