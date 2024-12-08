const mongoose=require("mongoose")
const StudentCounter = require("./counter")
const student=mongoose.Schema({ 
    id:{
        type:String,
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
    },
    status:{
        type: String,
        default: "pending"
    }
})


student.methods.assignId = async function() {
    if (this.status === "approved" && !this.id) {
        const currentYear = new Date().getFullYear();
        
        // Find or create counter for the current year
        let counter = await StudentCounter.findOne({ year: currentYear });
        if (!counter) {
            counter = new StudentCounter({ year: currentYear, count: 0 });
        }

        counter.count += 1; // Increment the count
        await counter.save();

        // Set the student ID with zero-padded count
        this.id = `S${currentYear}${String(counter.count).padStart(4, "0")}`;
    }
};

student.index({ id: 1 }, { unique: true, partialFilterExpression: { id: { $ne: null } } });


const Students=mongoose.model("Students",student)
Students.collection.dropIndex("id_1").catch((err) => {
    console.log("Index on 'id' does not exist or couldn't be dropped:", err.message);
  });
module.exports=Students

