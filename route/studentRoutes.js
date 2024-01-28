const express = require("express");
const router = express.Router();
const studentsController = require("../controller/studentsController");

router.route("/").get(studentsController.findAllStudents);
router.route("/:id").get(studentsController.findStudentById);

module.exports = router;
