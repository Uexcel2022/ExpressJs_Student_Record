const express = require("express");
const router = express.Router();
const studentsController = require("../controller/studentsController");

router
  .route("/")
  .get(studentsController.findAllStudents)
  .post(studentsController.addStudent);

router
  .route("/:id")
  .get(studentsController.findStudentById)
  .patch(studentsController.updateStudent)
  .delete(studentsController.deleteStudent);

module.exports = router;
