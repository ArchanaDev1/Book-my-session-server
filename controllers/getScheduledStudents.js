const saveLog = require('./saveLog.js');
const db = require("../db/index.js")
const getScheduledStudents = async (req, res) => {
    const studentIds = req.body;
    console.log("Student Lists: ", studentIds);
    try {
        const response = await db.Students.find({ id: { $in: studentIds } })
        console.log("getting scheduled students ", response)
        res.status(200).send({response })

    }
    catch (error) {
        console.log("error in getting scheduled students",error)
        res.status(500).send({error})

    }

}
module.exports=getScheduledStudents