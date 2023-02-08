const express = require("express");
const studentControllers = require("../controllers/student-controllers");
const router = express.Router();

router.get("/student", studentControllers.getStudent);
router.post("/student/edit", studentControllers.editStudent);
router.post("/student/delete", studentControllers.deleteStudent);
router.post("/student/add", studentControllers.addStudent);

module.exports = router;
