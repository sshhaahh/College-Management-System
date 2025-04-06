import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./pages/Courses";
import AdminDashboard from "./pages/AdminDashboard";
import AllStudents from "./components/AllStudents";

const Home = () => <h1 className="p-4 text-xl">Home Page</h1>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // ✅ Storage change hone pe state update karo
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // ✅ Logout Function: Token remove + State update
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false); // ✅ Navbar turant gayab ho jayega
  };

  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen">
        {/* ✅ Navbar sirf tab dikhega jab user logged in hoga */}
        {isAuthenticated && <Navbar className="w-1/5 bg-gray-800 text-white" onLogout={handleLogout} />}
        
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ✅ Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/courses" element={<Courses/>}/>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard/>} />
              <Route path="/all-students" element={<AllStudents/>}/>
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
