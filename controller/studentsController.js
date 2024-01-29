const fs = require("fs");
const Students = require("./../models/studentModel");

exports.addStudent = async (req, resp) => {
  const student = await Students.create(req.body);
  resp.status(201).json({
    status: "success",
    data: {
      student,
    },
  });
};

exports.findAllStudents = async (req, resp) => {
  const students = await Students.find();
  resp.status(200).json({
    status: "success",
    count: students.length,
    data: {
      students: students,
    },
  });
};

exports.findStudentById = async (req, resp) => {
  const id = req.params.id;
  const student = await Students.findById(id);
  if (!student) {
    return resp.status(404).json({
      status: "fail",
      message: `Can't find student with ID: ${id}`,
    });
  }
  resp.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
};

exports.updateStudent = async (req, resp) => {
  const id = req.params.id;
  let student = await Students.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return resp.status(404).json({
      status: "fail",
      message: `Can't find student with ID: ${id}`,
    });
  }
  resp.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
};

exports.deleteStudent = async (req, resp) => {
  const id = req.params.id;
  let student = await Students.findByIdAndDelete(id);
  if (!student) {
    return resp.status(404).json({
      status: "fail",
      message: `Can't find student with ID: ${id}`,
    });
  }

  resp.status(204).json({
    status: "success",
    data: null,
  });
};
