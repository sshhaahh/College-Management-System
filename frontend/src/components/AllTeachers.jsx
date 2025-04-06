import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/showallteachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("API Response:", response.data.data); 
      
      if (Array.isArray(response.data)) {
        setTeachers(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setTeachers([]);
      }
    } catch (error) {
      console.error("Failed to fetch teachers", error);
      setTeachers([]);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deleteteacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
    } catch (error) {
      console.error("Failed to delete teacher", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-5"
    >
      <h2 className="text-2xl font-bold mb-4">All Teachers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id} className="text-center">
              <td className="border border-gray-300 p-2">{teacher.name}</td>
              <td className="border border-gray-300 p-2">{teacher.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => deleteTeacher(teacher._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default AllTeachers;
