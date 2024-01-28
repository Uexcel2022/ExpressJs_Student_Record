const { query } = require("express");
const fs = require("fs");
const students = JSON.parse(fs.readFileSync("./data/students.json", "utf-8"));

exports.addStudent = async ()=>{
    const student =

}

exports.findAllStudents = async (req, resp) => {
  resp.status(200).json({
    status: "success",
    data: {
      students: students,
    },
  });
};

exports.findStudentById = async (req, resp) => {
  const id = req.params.id * 1;
  const student = await students.find((el) => el._id == id);
  resp.status(200).json({
    status: "success",
    data: {
      student: student,
    },
  });
};
