const mongoose=require("mongoose") 
const TeacherCounter= require('./counter');
const teacher=mongoose.Schema({
    id:{
        type:String,
        unique:true,
        default: null
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
    required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

teacher.methods.assignId = async function() {
    if (!this.id) {
        const currentYear = new Date().getFullYear();
        
        // Find or create counter for the current year
        let counter = await TeacherCounter.findOne({ year: currentYear });
        if (!counter) {
            counter = new TeacherCounter({ year: currentYear, count: 0 });
        }

        counter.count += 1; // Increment the count
        await counter.save();

        // Set the student ID with zero-padded count
        this.id = `T${currentYear}${String(counter.count).padStart(4, "0")}`;
    }
};

const Teachers=mongoose.model("Teachers",teacher)
module.exports=Teachers

