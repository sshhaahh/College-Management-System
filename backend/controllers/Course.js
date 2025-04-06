const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/User");

// ✅ Function to generate unique course codes
async function generateUniqueCourseCode() {
    let courseCode;
    let isUnique = false;

    while (!isUnique) {
        courseCode = `C-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
        const existingCourse = await Course.findOne({ code: courseCode });
        if (!existingCourse) isUnique = true;
    }
    return courseCode;
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacher", "name email"); // Populate teacher details
        return res.status(200).json({ success: true, data: courses });
    } catch (e) {
        console.error("Failed to fetch courses!", e);
        return res.status(500).json({ success: false, message: "Failed to fetch courses." });
    }
};




exports.addCourse = async (req, res) => {
    try {
        const { name, description, teacher, duration, subjects, fee } = req.body;

        if (!name || !description || !teacher || !duration || !fee || !subjects) {
            return res.status(403).json({ success: false, message: "All fields are required!" });
        }

        const code = await generateUniqueCourseCode();

        const course = new Course({ name, description, code, teacher, duration, subjects, fee });
        await course.save();

        await User.findByIdAndUpdate(teacher, { $push: { courses: course._id } }, { new: true });

        return res.status(201).json({ success: true, message: "Successfully created course.", data: course });
    } catch (e) {
        console.error("Failed to create course!", e);
        return res.status(500).json({ success: false, message: "Failed to create course." });
    }
};

// ✅ Update Course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, duration, subjects, fee } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { name, description, duration, subjects, fee },
            { new: true }
        );

        if (!updatedCourse) return res.status(404).json({ success: false, message: "Course not found." });

        return res.status(200).json({ success: true, message: "Course updated successfully.", data: updatedCourse });
    } catch (e) {
        console.error("Failed to update course!", e);
        return res.status(500).json({ success: false, message: "Failed to update course." });
    }
};

// ✅ Delete Course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) return res.status(404).json({ success: false, message: "Course not found." });

        await User.findByIdAndUpdate(deletedCourse.teacher, { $pull: { courses: deletedCourse._id } });

        return res.status(200).json({ success: true, message: "Course deleted successfully.", data: deletedCourse });
    } catch (e) {
        console.error("Failed to delete course!", e);
        return res.status(500).json({ success: false, message: "Failed to delete course." });
    }
};

// ✅ Buy Course (Enroll Student)
exports.buyCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ success: false, message: "Student ID and Course ID are required!" });
        }

        const student = await User.findOne({ _id: studentId, role: "Student" });
        if (!student) return res.status(404).json({ success: false, message: "Student not found!" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ success: false, message: "Course not found!" });

        if (student.courses.includes(courseId)) {
            return res.status(400).json({ success: false, message: "Student is already enrolled in this course!" });
        }

        student.courses.push(courseId);
        await student.save();

        return res.status(200).json({ success: true, message: "Course purchased successfully!", data: student });
    } catch (error) {
        console.error("Failed to buy course!", error);
        return res.status(500).json({ success: false, message: "Failed to buy course." });
    }
};
