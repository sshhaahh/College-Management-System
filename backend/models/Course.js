const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    duration: { type: String, required: true },
    subjects: [{ subjectName: { type: String, required: true } }],
    fee: { type: Number, required: true } // ✅ Fee field fixed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
