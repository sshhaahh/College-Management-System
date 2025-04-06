const Marks = require("../models/Marks");
const User = require("../models/User");
const Course = require("../models/Course");


// ✅ Add Marks API
exports.addMarks = async (req, res) => {
    try {
        const { studentId, courseId, subjectMarks } = req.body;

        if (!studentId || !courseId || !subjectMarks || subjectMarks.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Student ID, Course ID, and Subject Marks are required.",
            });
        }

        const student = await User.findById(studentId);
        if (!student || student.role !== "Student") {
            return res.status(404).json({
                success: false,
                message: "Student not found!",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        if (!student.course.includes(courseId)) {
            return res.status(403).json({
                success: false,
                message: "Student is not enrolled in this course.",
            });
        }

        const existingMarks = await Marks.findOne({ student: studentId, course: courseId });
        if (existingMarks) {
            return res.status(400).json({
                success: false,
                message: "Marks already added for this student in this course.",
            });
        }

        const marks = new Marks({
            student: studentId,
            course: courseId,
            subjectMarks,
        });

        await marks.save();

        return res.status(201).json({
            success: true,
            message: "Marks added successfully!",
            data: marks,
        });

    } catch (error) {
        console.error("Error adding marks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};




exports.updateMarks = async (req, res) => {
    try {
        const { studentId, courseId, subjectMarks } = req.body;

        if (!studentId || !courseId || !subjectMarks || subjectMarks.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Student ID, Course ID, and Subject Marks are required.",
            });
        }

        const existingMarks = await Marks.findOne({ student: studentId, course: courseId });

        if (!existingMarks) {
            return res.status(404).json({
                success: false,
                message: "Marks not found for this student in this course.",
            });
        }

        existingMarks.subjectMarks = subjectMarks;
        await existingMarks.save();

        return res.status(200).json({
            success: true,
            message: "Marks updated successfully!",
            data: existingMarks,
        });

    } catch (error) {
        console.error("Error updating marks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
