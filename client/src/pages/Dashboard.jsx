import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token or session storage
    localStorage.removeItem("authToken"); // Example token removal
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8">
        {/* Welcome Section */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome to Your Dashboard!
        </h2>
        <p className="text-center text-white text-lg mb-8">
          Explore your profile, courses, and modules all in one place.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
            <h3 className="font-bold text-xl text-purple-700 mb-4">Your Profile</h3>
            <p className="text-gray-600">
              Manage your personal information and account settings.
            </p>
          </div>
          {/* Courses Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
            <h3 className="font-bold text-xl text-indigo-700 mb-4">Courses</h3>
            <p className="text-gray-600">
              Browse through your courses and track your progress.
            </p>
          </div>
          {/* Modules Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition">
            <h3 className="font-bold text-xl text-pink-700 mb-4">Modules</h3>
            <p className="text-gray-600">
              Access in-depth modules and study materials.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
