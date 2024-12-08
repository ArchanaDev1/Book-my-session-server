const db = require("../db/index.js")
const searchTeacherAppointments = async (req, res) => {
    const {email, studentID} = req.query;
    try {
        const teacher = await db.Teachers.findOne({email: email});
        const response = await db.Appointments.find(email.length<1?{studentID: studentID}:{teacherID: teacher.id, studentID: studentID});
        res.status(200).send({response })
    }
    catch (error) {
        console.log("error in getting appointments",error)
        res.status(500).send({error})
    }

}
module.exports=searchTeacherAppointments;