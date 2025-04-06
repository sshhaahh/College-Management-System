import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // ✅ Added useNavigate
import { motion } from "framer-motion";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  // ✅ Added error state
  const navigate = useNavigate();  // ✅ Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${url}/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      window.dispatchEvent(new Event("storage"));  // ✅ Auth state ko update karne ke liye
  
      if (response.data.user.role === "Student") {
        navigate("/student-dashboard");
      } else if (response.data.user.role === "Admin") {
        navigate("/admin-dashboard");
      } 
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  
    setLoading(false);
  };
  
  
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold text-center text-gray-800 mb-6"
        >
          Welcome Back
        </motion.h2>
        <p className="text-center text-gray-500 mb-4">Login to your account</p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>} 

        <div className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.05, borderColor: "#2563EB" }}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
          />
          <motion.input
            whileFocus={{ scale: 1.05, borderColor: "#2563EB" }}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center font-semibold text-lg"
            disabled={loading}
          >
            {loading ? (
              <motion.span
                className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
              ></motion.span>
            ) : (
              "Login"
            )}
          </motion.button>
        </div>

        <div className="flex justify-between items-center mt-4 text-gray-600">
          <Link to="#" className="hover:text-blue-500 text-sm">Forgot Password?</Link>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
