import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios"; // For making API requests
import GoogleSymbol from "../assets/google.png";
import CompanyLogo from "../assets/cmgc.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      const { token, user } = response.data;

      // Store the JWT token in localStorage
      localStorage.setItem("token", token);

      // Redirect the user to the dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Display the error message
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-300">
        {/* Logo */}
        <div className="bg-black p-2 flex justify-center items-center rounded-md">
          <img src={CompanyLogo} alt="Company Logo" className="w-32" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Log in to Your Account
        </h2>
        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-6 text-center">Welcome !!!</p>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        {/* Google Sign-In */}
        <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center">
          <img src={GoogleSymbol} alt="Google" className="w-5 h-5 mr-2" />
          Log in with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <a href="/Registration" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
