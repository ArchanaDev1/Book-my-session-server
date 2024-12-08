// models/Counter.js
const mongoose = require("mongoose");

const studentCounter = new mongoose.Schema({
    year: { type: Number, required: true },
    count: { type: Number, default: 0 }
});

const teacherCounter = new mongoose.Schema({
    year: { type: Number, required: true },
    count: { type: Number, default: 0 }
});

const appointmentCounter = new mongoose.Schema({
    year: { type: Number, required: true },
    count: { type: Number, default: 0 }
});

const StudentCounter = mongoose.model("StudentCounter", studentCounter);
const TeacherCounter = mongoose.model("TeacherCounter", teacherCounter);
const AppointmentCounter = mongoose.model("AppointmentCounter", appointmentCounter);

module.exports = StudentCounter;
module.exports = TeacherCounter;
module.exports = AppointmentCounter;
