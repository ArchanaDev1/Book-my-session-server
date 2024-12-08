const saveLog = require('./saveLog.js');
const db = require("../db/index.js")
const getAppointments = async (req, res) => {
    
    try {
        const response = await db.Appointments.find()
        res.status(200).send({response })

    }
    catch (error) {
        console.log("error in getting appointments",error)
        res.status(500).send({error})

    }

}
module.exports=getAppointments