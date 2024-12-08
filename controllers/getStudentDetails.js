const db = require("../db/index.js")
const saveLog = require('./saveLog.js');

const getStudentDeails = async (req, res) => {
    const {email} = req.body;
    try {
        const response = await db.Students.findOne({email})
        console.log("getting Student ", response)

        if(response){
            res.status(200).send({response })
        }
        else{
            res.status(404).send({error: "Not Found"})
        }

    }
    catch (error) {
        console.log("error in getting Student",error)
        res.status(500).send({error})

    }

}
module.exports=getStudentDeails