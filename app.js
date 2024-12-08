const express = require('express');
const cors = require('cors')
const app = express();
const getTeachers =require("./controllers/getTeachers.js")
const Addteacher=require('./controllers/Addteacher.js')
const updateTeacher=require('./controllers/updateTeacher.js')
const addStudent = require('./controllers/addStudent.js');
const studentLogin = require('./controllers/studentLogin.js')
const addAppointment = require('./controllers/addAppointment.js');
const getAppointments = require('./controllers/getAppointments.js');
const getScheduledTeachers = require('./controllers/getScheduledTeachers.js')
const getStudents = require('./controllers/getStudents.js');
const approveStudent = require('./controllers/approveStudent.js');
const getScheduledStudents = require("./controllers/getScheduledStudents.js")
const approveAppointment = require("./controllers/approveAppointment.js")
const getTeacherDetails = require("./controllers/getTeacherDetails.js");
const getStudentDetails = require('./controllers/getStudentDetails.js');
const teacherLogin = require("./controllers/teacherLogin.js")
const adminLogin = require("./controllers/adminLogin.js")
const myAppointments = require("./controllers/myAppointments.js")
const updateStudent = require("./controllers/updateStudent.js");
const searchStudentAppointments = require('./controllers/searchStudentAppointments.js');
const searchTeacherAppointments = require('./controllers/searchTeacherAppointments.js');
const changeStudentPassword = require('./controllers/changeStudentPassword.js');
const changeTeacherPassword = require('./controllers/changeTeacherPassword.js');
const deleteStudent = require('./controllers/deleteStudent.js');
const deleteTeacher = require('./controllers/deleteTeacher.js');
const verifyToken = require('./middlewares/verifyToken.js');


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ******************Admin's Routes***********************
app.post("/api/admin-login", adminLogin);
app.put('/api/update-teacher',verifyToken, updateTeacher);
app.put('/api/update-student', verifyToken, updateStudent);
app.post('/api/teacher-list', getScheduledTeachers)
app.get('/api/students', getStudents);
app.post('/api/add-teacher', verifyToken, Addteacher)
app.put('/api/change-student-password', verifyToken, changeStudentPassword);
app.put('/api/change-teacher-password', verifyToken, changeTeacherPassword);
app.delete('/api/delete-student', verifyToken, deleteStudent);
app.delete('/api/delete-teacher', verifyToken, deleteTeacher);
// *****************Teacher's Routes**********************
app.post('/api/teacher-login',teacherLogin);
app.post('/api/approve-student',verifyToken, approveStudent);
app.post('/api/approve-appointment', verifyToken, approveAppointment)
// *****************Student's Routes**********************
app.post('/api/login', studentLogin);
// *****************Common Routes*************************
app.get('/api/teachers',getTeachers)
app.post('/api/add-appointment', verifyToken ,addAppointment);
app.get('/api/appointments', getAppointments);
app.post('/api/student-list', getScheduledStudents);
app.post('/api/teacher-details', getTeacherDetails);
app.post('/api/student-details', getStudentDetails);
app.post('/api/add-student', addStudent)
app.get('/api/myappointments', myAppointments);
app.get('/api/search-student-appointments', searchStudentAppointments);
app.get('/api/search-teacher-appointments', searchTeacherAppointments);

app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
});

