const saveLog = require('./saveLog.js');
const db = require("../db/index.js");
const argon = require("argon2");
const jwt = require('jsonwebtoken');

const studentLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Hello");

  try {
    const response = await db.Students.findOne({ email });
    if (response) {
      if (await argon.verify(response.password, password)) {
        if (response.status === "pending") {
          res
            .status(300)
            .send({ error: "Registration is pending for approval" });
        } else {
          res.status(200).send({
            _id: response._id,
            id: response.id,
            name: response.name,
            email: response.email,
            department: response.department,
            phone: response.phone,
            address: response.address,
            gender: response.gender,
            token: jwt.sign({
              id: response.id,
              email: response.email,
              password: response.password
            }, "JWT_SECRET")
          });
        }
      } else {
        res.status(404).send({ msg: "Email or password is invalid" });
      }
    } else {
      res.status(404).send({ msg: "Email or password is invalid" });
    }
  } catch (error) {
    console.log("Database error while searching student", error);
    res.status(500).send({ error });
  }
};
module.exports = studentLogin;
