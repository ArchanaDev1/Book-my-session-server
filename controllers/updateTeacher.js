const saveLog = require('./saveLog.js');
const db = require("../db/index.js")
const updateTeacher = async (req, res) => {
    const {
        name,
        email,
        department,
        subject,
        salary,
        phone,
        address,
        gender
    } = req.body.newData

    try {
        const response = await db.Teachers.findOneAndUpdate({
            email: req.body.user.email
        }, {
            $set: {
                name,
                email,
                department,
                subject,
                salary,
                phone,
                address,
                gender
            }
        })
        console.log("Updating teacher ", response)
        res.status(200).send({ response })

    }
    catch (error) {
        console.log("error in updating teacher", error)
        res.status(500).send({ error })

    }

}
module.exports = updateTeacher