const AppointmentCounter = require("./counter");

const mongoose=require("mongoose") 
const appointment=mongoose.Schema({
    id:{
        type:String,
        unique:true,
        default: null
    },
    studentID:{
        type:String,
        required:true
    },
    teacherID:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:String,
        required:true
    },
    appointmentTime: {
        hour: {
            type: String, 
            required: true
        },
        minute: {
            type: String, 
            required: true
        },
        period: {
            type: String, // e.g., "AM" or "PM"
            required: true,
            enum: ['AM', 'PM'] // Restrict values to AM or PM
        }
    },
    appointmentLocation:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    message:{
        type:String,

    },
    createdDate: {
        type: Date,
        default: Date.now // Automatically set to the current date
    },
    createdTime: {
        type: String,
        default: () => {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } // Automatically set to the current time in HH:MM format
    }
    
})

appointment.methods.assignId = async function() {
    if (!this.id) {
        const currentYear = new Date().getFullYear();
        
        // Find or create counter for the current year
        let counter = await AppointmentCounter.findOne({ year: currentYear });
        if (!counter) {
            counter = new AppointmentCounter({ year: currentYear, count: 0 });
        }

        counter.count += 1; // Increment the count
        await counter.save();

        // Set the student ID with zero-padded count
        this.id = `A${currentYear}${String(counter.count).padStart(4, "0")}`;
    }
};

const Appointments=mongoose.model("Appointments",appointment)
module.exports=Appointments

