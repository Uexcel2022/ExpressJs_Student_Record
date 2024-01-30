const Students = require("./../models/studentModel");
const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const CustomError = require("./../utils/customError");
const ApiFeatures = require("./../utils/apiFeatures");

exports.addStudent = asyncErrorHandler(async (req, resp, next) => {
  const stud = await Students.findOne({ email: req.body.email });
  if (stud) {
    const error = new CustomError(
      `This email address : ${req.body.email} has been used by someone else. Please Consult the school`,
      400
    );
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
  const count = await Students.countDocuments();
  const apiFeatures = new ApiFeatures(Students.find(), req.query, count)
    .sortUrl()
    .sortQueryResult()
    .selectedFields();

  const students = await apiFeatures.query;
  resp.status(200).json({
    status: "success",
    count: students.length,
    data: {
      students,
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

exports.updateStudent = asyncErrorHandler(async (req, resp, next) => {
  if (req.body.email) {
    const stud = await Students.findOne({ email: req.body.email });
    if (stud) {
      const error = new CustomError(
        `This email address : ${req.body.email} has been used by someone else. Please Consult the school`,
        400
      );
      return next(error);
    }
  }
  const id = req.params.id;
  const student = await Students.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    const msg = `Can't find student with ID: ${id}`;
    const err = new CustomError(msg, 404);
    return next(err);
  }
  resp.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.deleteStudent = asyncErrorHandler(async (req, resp, next) => {
  const id = req.params.id;
  let student = await Students.findByIdAndDelete(id);

  if (!student) {
    const msg = `Can't find student with ID: ${id}`;
    const err = new CustomError(msg, 404);
    return next(err);
  }

  resp.status(204).json({
    status: "success",
    data: null,
  });
});
