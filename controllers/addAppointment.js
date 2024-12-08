const db = require("../db/index.js");
const saveLog = require('./saveLog.js');

const addAppointment = async (req, res) => {
  const {
    studentID,
    teacherID,
    appointmentDate,
    appointmentTime,
    appointmentLocation,
    message,
  } = req.body;

  try {
    const response = await db.Appointments.create({
      studentID,
      teacherID,
      appointmentDate,
      appointmentTime,
      appointmentLocation,
      message,
    });
    await response.assignId();
    await response.save();
    console.log("Adding appointment ", req.userInfo);
    await saveLog(
      req.userInfo?req.userInfo.email:response.teacherID,
      response._id,
      "CREATE",
      `An appointment has been created by ${req.userInfo.email}. Student = ${response.studentID}, Teacher = ${response.teacherID}.`
    )

    // console.log("Adding appointment ", response);
    res.status(200).send({ response });
  } catch (error) {
    console.log("error in adding appointment", error);
    res.status(500).send({ error });
  }
};
module.exports = addAppointment;
