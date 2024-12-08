const saveLog = require('./saveLog.js');
const db = require("../db/index.js")
const getTeachers = async (req, res) => {
    
    try {
        const response = await db.Teachers.find()
        console.log("getting teachers ", response)
        res.status(200).send({response })

    }
    catch (error) {
        console.log("error in getting teacher",error)
        res.status(500).send({error})

    }

}
module.exports=getTeachers