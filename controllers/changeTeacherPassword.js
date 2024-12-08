const db = require("../db/index.js");
const argon = require('argon2')
const saveLog = require('./saveLog.js');

const changeTeacherPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const response = await db.Teachers.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          password: await argon.hash(newPassword)
        },
      }
    );
    console.log("Updating teacher password", response);
    await saveLog(
      req.userInfo.email,
      response._id,
      "UPDATE",
      `"${req.userInfo.email}" has changed the password of the teacher "${response.email}".`
    )
    res.status(200).send({ message: "Password updated successfully!"});
  } catch (error) {
    console.log("error in updating teacher password", error);
    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "UPDATE",
      `"${req.userInfo.email}" tried to change the password of the teacher "${email} but failed".`
    )
    res.status(500).send({ error });
  }
};
module.exports = changeTeacherPassword;
