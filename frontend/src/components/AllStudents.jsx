import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/showallstudents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-5"
    >
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="text-center">
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">{student.email}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => deleteStudent(student._id)}
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

export default AllStudents;
