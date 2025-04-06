import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';


const Signup = ({url}) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Student" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Signup Data:", formData);
      try {
        const res= axios.post(`${url}/signup`,formData)
      } catch (e) {
        console.log("Signup failed! ",e)
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
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
          Create Account
        </motion.h2>
        <p className="text-center text-gray-500 mb-4">Sign up to get started</p>

        <div className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.05, borderColor: "#9333EA" }}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
          />
          <motion.input
            whileFocus={{ scale: 1.05, borderColor: "#9333EA" }}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
          />
          <motion.input
            whileFocus={{ scale: 1.05, borderColor: "#9333EA" }}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
          />
          
          <div className="flex justify-center gap-4 my-4">
            <button
              onClick={() => handleRoleSelect("Student")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${formData.role === "Student" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Student
            </button>
            <button
              onClick={() => handleRoleSelect("Teacher")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${formData.role === "Teacher" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Teacher
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignup}
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition flex items-center justify-center font-semibold text-lg"
          >
            {loading ? (
              <motion.span 
                className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
              ></motion.span>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
