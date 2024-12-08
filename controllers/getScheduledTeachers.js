const saveLog = require('./saveLog.js');
const db = require("../db/index.js")
const getScheduledTeachers = async (req, res) => {
    const teacherIds = req.body;
    console.log("Teacher Lists: ", teacherIds);
    try {
        const response = await db.Teachers.find({ id: { $in: teacherIds } })
        console.log("getting scheduled teachers ", response)
        res.status(200).send({response })

    }
    catch (error) {
        console.log("error in getting scheduled teacher",error)
        res.status(500).send({error})

    }

}
module.exports=getScheduledTeachers