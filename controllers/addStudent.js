const db = require("../db/index.js");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const saveLog = require('./saveLog.js');

const addStudent = async (req, res) => {
  const { name, email, department, phone, address, gender, password } =
    req.body;

  try {
    const response = await db.Students.create({
      name,
      email,
      department,
      phone,
      address,
      gender,
      password: await argon.hash(password),
    });
    console.log("Adding student ", response);
    await saveLog(
      req.userInfo?req.userInfo.email:response.email,
      req.userInfo?req.userInfo._id:response._id,
      "CREATE",
      `New student "${response.email}" has been added.`
    )

    res.status(200).send({
      _id: response._id,
      id: response.id,
      name: response.name,
      email: response.email,
      department: response.department,
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
    console.log("error in adding student", error);
    res.status(500).send({ error });
  }
};
module.exports = addStudent;
