const saveLog = require('./saveLog.js');
const db = require("../db/index.js")
const getStudents = async (req, res) => {
    
    try {
        const response = await db.Students.find()
        console.log("getting Students ", response)
        res.status(200).send({response })

    }
    catch (error) {
        console.log("error in getting Students",error)
        res.status(500).send({error})

    }

}
module.exports=getStudents