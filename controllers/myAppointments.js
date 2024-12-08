const db = require("../db/index.js")
const myAppointments = async (req, res) => {

    const {id, user} = req.query;
    console.log("My query: ", req.query)
    
    try {
        const response = await db.Appointments.find(user=="student"?{studentID: id}:{teacherID:id})
        console.log("My appointments: ",response);
        res.status(200).send({response })

    }
    catch (error) {
        console.log("error in getting appointments",error)
        res.status(500).send({error})

    }

}
module.exports=myAppointments