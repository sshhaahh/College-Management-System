const Fee = require("../models/Fee");
const Course = require("../models/Course");
const User = require("../models/User");

exports.payFee = async (req, res) => {
    try {
        const { studentId, courseId, transactionId } = req.body;

        if (!studentId || !courseId || !transactionId) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ success: false, message: "Course not found!" });

        const student = await User.findOne({ _id: studentId, role: "Student" });
        if (!student) return res.status(404).json({ success: false, message: "Student not found!" });

        const existingPayment = await Fee.findOne({ student: studentId, course: courseId });
        if (existingPayment && existingPayment.status === "Paid") {
            return res.status(400).json({ success: false, message: "Fee already paid for this course!" });
        }

        const fee = new Fee({ student: studentId, course: courseId, amount: course.fee, transactionId, status: "Paid" });
        await fee.save();

        return res.status(201).json({ success: true, message: "Fee paid successfully!", data: fee });
    } catch (error) {
        console.error("Fee payment failed!", error);
        return res.status(500).json({ success: false, message: "Failed to process fee payment." });
    }
};
