const db = require("../db/index.js")
const searchStudentAppointments = async (req, res) => {
    const {email, teacherID} = req.query;
    try {
        const student = await db.Students.findOne({email: email});
        console.log("My student: ",student)
        const response = await db.Appointments.find(email.length<1?{teacherID: teacherID}:{studentID: student.id, teacherID: teacherID});
        res.status(200).send({response })
    }
    catch (error) {
        console.log("error in getting appointments",error)
        res.status(500).send({error})
    }

}
module.exports=searchStudentAppointments;