const db = require("../db/index.js");
const saveLog = require('./saveLog.js');

const deleteTeacher = async (req, res) => {
  const { id } = req.query;
  let email = "<email>";
  try {
    const teacher = await db.Teachers.findOne({ id: id });
    const response = await db.Teachers.deleteOne({ id: id });
    email = teacher.email;
    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "DELETE",
      `"${req.userInfo.email}" has deleted the teacher "${teacher.email}".`
    )
    if (response.deletedCount > 0) {
      const appointements = await db.Appointments.deleteMany({ teacherID: id });
      await saveLog(
        req.userInfo.email,
        req.userInfo._id,
        "DELETE",
        `"${req.userInfo.email}" has deleted the teacher "${email}". Therefore, teacher's all appointments has been deleted.`
      )
      console.log(appointements);
      res.status(200).send({ response });
    } else {
      res.status(404).send({ error: "Not found!", response });
    }
  } catch (error) {
    console.log("error in deleting teacher", error);
    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "DELETE",
      `"${req.userInfo.email}" tried to delete the teacher "${email}", but failed.`
    )
    res.status(500).send({ error });
  }
};
module.exports = deleteTeacher;
