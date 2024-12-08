const db = require("../db/index.js");
const saveLog = require('./saveLog.js');

const deleteStudent = async (req, res) => {
  const { id } = req.query;
  let email = "";
  try {
    const student = await db.Students.findOne({ id: id });
    const response = await db.Students.deleteOne({ id: id });
    email = student.email;
    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "DELETE",
      `"${req.userInfo.email}" has deleted the student "${student.email}".`
    )
    console.log("Deleting student", response);
    if (response.deletedCount > 0) {
        const appointements = await db.Appointments.deleteMany({studentID: id})
        await saveLog(
          req.userInfo.email,
          req.userInfo._id,
          "DELETE",
          `"${req.userInfo.email}" has deleted the student "${email}. Therefore, student's all appointments has been deleted".`
        )
        console.log(appointements)
      res.status(200).send({ response });
    } else {
      res.status(404).send({ error: "Not found!", response });
    }
  } catch (error) {
    console.log("error in deleting student", error);
    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "DELETE",
      `"${req.userInfo.email}" tried to delete the student "${email}, but failed".`
    )
    res.status(500).send({ error });
  }
};
module.exports = deleteStudent;
