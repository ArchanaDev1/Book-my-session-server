const db = require("../db/index.js");
const argon = require('argon2')
const saveLog = require('./saveLog.js');

const changeStudentPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const response = await db.Students.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          password: await argon.hash(newPassword)
        },
      }
    );
    console.log("Updating student password", response);
    await saveLog(
      req.userInfo.email,
      response._id,
      "UPDATE",
      `"${req.userInfo.email}" has changed the password of the student "${response.email}".`
    )
    res.status(200).send({ message: "Password updated successfully!"});
  } catch (error) {
    console.log("error in updating student password", error);
    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "UPDATE",
      `"${req.userInfo.email}" tried to change the password of the student "${email} but failed".`
    )
    res.status(500).send({ error });
  }
};
module.exports = changeStudentPassword;
