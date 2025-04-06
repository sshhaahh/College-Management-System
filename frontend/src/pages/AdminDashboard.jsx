import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="flex h-screen">
   
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">Welcome, Admin!</h2>
        <p className="text-gray-600 mt-2">Manage your platform efficiently.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
