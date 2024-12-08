const db = require("../db/index.js");
const jwt = require('jsonwebtoken');
const saveLog = require('./saveLog.js');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await db.Admin.findOne({ email, password });
    if (response) {

      await saveLog(
        req.userInfo?req.userInfo.email:response.email,
        req.userInfo?req.userInfo._id:response._id,
        "LOGIN",
        `An admin "${response.email}" has logged in.`
      )

      res.status(200).send({
          _id: response._id,
          email: response.email,
          token: jwt.sign({
            _id: response._id,
            email: response.email,
            password: response.password
          }, "JWT_SECRET")
      });
    } else {
      res.status(404).send({ msg: "Email or password is invalid" });
    }
  } catch (error) {
    console.log("Database error while searching admin", error);
    res.status(500).send({ error });
  }
};
module.exports = adminLogin;
