const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    subjectMarks: [
        {
            subjectName: { type: String, required: true }, 
            marksObtained: { type: Number, required: true }, 
            totalMarks: { type: Number, required: true, default:100 }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Marks", MarksSchema);
