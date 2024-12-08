const db = require("../db/index.js");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const saveLog = require('./saveLog.js');

const Addteacher = async (req, res) => {
  const {
    id,
    name,
    email,
    department,
    subject,
    salary,
    phone,
    address,
    gender,
    password,
  } = req.body;

  try {
    const response = await db.Teachers.create({
      name,
      email,
      department,
      subject,
      salary,
      phone,
      address,
      gender,
      password: await argon.hash(password),
    });
    await response.assignId();
    await response.save();
    console.log("Adding teacher ", response);

    await saveLog(
      req.userInfo.email,
      req.userInfo._id,
      "CREATE",
      `${req.userInfo.email} has added a new teacher "${response.email}".`
    )

    res.status(200).send({
      _id: response._id,
      id: response.id,
      name: response.name,
      email: response.email,
      department: response.department,
      subject: response.subject,
      salary: response.salary,
      phone: response.phone,
      address: response.address,
      gender: response.gender,
      token: jwt.sign(
        {
          id: response.id,
          email: response.email,
          password: response.password,
        },
        "JWT_SECRET"
      ),
    });
  } catch (error) {
    console.log("error in adding teacher", error);
    res.status(500).send({ error });
  }
};
module.exports = Addteacher;
