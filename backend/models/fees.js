const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
    paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fee", FeeSchema);
