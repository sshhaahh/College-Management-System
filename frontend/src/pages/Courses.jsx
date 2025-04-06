import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        axios.get(`${url}/showallcourses`) 
            .then((res) => setCourses(res.data.data))
            .catch((err) => console.error("Error fetching courses:", err));
          }, []);
          
          const handleBuyCourse = (courseId) => {
      console.log(courses)
        console.log("Buying course with ID:", courseId);
        // Add API call for buying a course here
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <motion.div 
                            key={course._id} 
                            className="p-4 border rounded-lg shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h3 className="text-lg font-semibold">{course.name}</h3>
                            <p>{course.description}</p>
                            <p className="text-sm text-gray-500">Duration: {course.duration} months</p>
                            <p className="text-sm text-gray-500">Fee: ₹{course.fee}</p>
                            <p className="text-sm text-gray-500">Teacher: {course.teacher?.name}</p>
                            <motion.button 
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleBuyCourse(course._id)}
                            >
                                Buy Course
                            </motion.button>
                        </motion.div>
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default Courses;
