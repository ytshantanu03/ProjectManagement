import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import GoogleSymbol from "../assets/google.png";
import CompanyLogo from "../assets/cmgc.png";

const Registration = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setMessage(response.data.message); // Success message

      // Redirect to dashboard on success
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        // API error response
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-300">
        <div className="bg-black p-2 flex justify-center items-center rounded-md">
          <img src={CompanyLogo} alt="Company Logo" className="w-32" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Welcome !!!</p>
        {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a role</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center">
          <img src={GoogleSymbol} alt="Google" className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/Login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
