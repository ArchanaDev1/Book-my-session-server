const db = require("../db/index.js");
const saveLog = require('./saveLog.js');

const approveAppointment = async (req, res) => {
  const { _id, status } = req.body;

  try {
    const appointment = await db.Appointments.findOne({_id});
    if(appointment && appointment.status === "pending"){
        appointment.status = status;
        await appointment.save();
        await saveLog(
          req.userInfo.email,
          appointment._id,
          "UPDATE",
          `"${req.userInfo.email}" has updated the status as ${status} of appointment ${_id}.`
        )
        res.status(200).send(appointment);
    }
  } catch (error) {
    console.log("error in approving student", error);
    await saveLog(
      req.userInfo.email,
      _id,
      "UPDATE",
      `Error: "${req.userInfo.email}" tried to updated the status as ${status} of appointment ${_id} but failed.`
    )
    res.status(500).send({ error });
  }
};
module.exports = approveAppointment;
