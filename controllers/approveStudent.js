const db = require("../db/index.js"); 
const saveLog = require('./saveLog.js');

const approveStudent = async (req, res) => {
  const { email } = req.body;

  try {
    const student = await db.Students.findOne({email:email});
    if(student && student.status === "pending"){
        student.status = "approved";
        await student.assignId();
        await student.save();
        await saveLog(
          req.userInfo.email,
          student._id,
          "UPDATE",
          `"${req.userInfo.email}" has approved the registration of the student "${student.email}".`
        )
        res.status(200).send(student);
    }
  } catch (error) {
    console.log("error in approving student", error);
    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "UPDATE",
      `"${req.userInfo.email}" tried to approve the registration of the student "${email} but failed".`
    )
    res.status(500).send({ error });
  }
};
module.exports = approveStudent;
