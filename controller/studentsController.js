const Students = require("./../models/studentModel");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const CustomError = require("./../utils/customError");

exports.addStudent = asyncErrorHandler(async (req, resp, next) => {
  const stud = await Students.findOne({ email: req.body.email });
  console.log(stud);
  if (stud) {
    const error = new CustomError(
      `This email address : ${req.body.email} has been used by someone else. Please Consult the school`,
      400
    );
    1;
    return next(error);
  }

  const student = await Students.create(req.body);

  resp.status(201).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.findAllStudents = asyncErrorHandler(async (req, resp, next) => {
  const students = await Students.find();
  resp.status(200).json({
    status: "success",
    count: students.length,
    data: {
      students: students,
    },
  });
});

exports.findStudentById = asyncErrorHandler(async (req, resp, next) => {
  const id = req.params.id;
  const student = await Students.findById(id);
  if (!student) {
    const msg = `Can't find student with ID: ${id}`;
    const customError = new CustomError(msg, 404);
    return next(customError);
  }
  resp.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.updateStudent = asyncErrorHandler(async (req, resp) => {
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
});

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
