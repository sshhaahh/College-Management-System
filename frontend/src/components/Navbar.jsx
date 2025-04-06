import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-gray-900 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <NavLinks role={role} onLogout={onLogout} />
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full bg-gray-900 text-white flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white p-4">
          <NavLinks role={role} setIsOpen={setIsOpen} onLogout={onLogout} />
        </div>
      )}
    </div>
  );
};

const NavLinks = ({ role, setIsOpen, onLogout }) => {
  const allLinks = {
    Student: [
      { name: "Dashboard", path: "/student-dashboard" },
      { name: "Buy Courses", path: "/courses" },
      { name: "Profile", path: "/profile" },
    ],
    Teacher: [
      { name: "Dashboard", path: "/teacher-dashboard" },
      { name: "Manage Courses", path: "/manage-courses" },
    ],
    Admin: [
      { name: "All Students", path: "/all-students" },
      { name: "All Teachers", path: "/all-teachers" },
      { name: "Reports", path: "/reports" },
    ],
  };

  const links = allLinks[role] || [];

  return (
    <nav className="space-y-2">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className="block p-2 rounded hover:bg-gray-700"
          onClick={() => setIsOpen && setIsOpen(false)}
        >
          {link.name}
        </Link>
      ))}

      {/* ✅ Logout Button */}
      <button
        onClick={onLogout}
        className="block p-2 rounded bg-red-600 hover:bg-red-700 w-full text-center"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
