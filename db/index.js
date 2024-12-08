const mongoose = require("mongoose")
const uri = "mongodb+srv://archana1234:1234@cluster0.urwxs.mongodb.net/Booking-appointment"
// const uri = "mongodb+srv://anshu:anshu@cluster0.yswee.mongodb.net/"

const connectDb = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Database connected successfully")
    }
    catch (error) {
        console.log(error)

    }

}
connectDb()
 mongoose.set("debug",true)

module.exports.Teachers=require("./teacher.js")
module.exports.Students=require("./student.js")
module.exports.Admin=require("./admin.js")
module.exports.Appointments=require("./appointment.js")

