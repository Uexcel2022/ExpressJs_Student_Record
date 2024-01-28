const fs = require("fs");
let students = JSON.parse(fs.readFileSync("./data/students.json", "utf-8"));

exports.addStudent = async (req, resp) => {
  const id = { _id: students[students.length - 1]._id + 1 };
  const newStudent = Object.assign(id, req.body);

  students.push(newStudent);
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students),
    (error) => {
      if (error) {
        return resp.status(500).json({
          status: "fail",
          message: "Error occurred, could not save student",
        });
      }
    }
  );

  resp.status(201).json({
    status: "success",
    data: {
      student: newStudent,
    },
  });
};

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
  if (!student) {
    return resp.status(404).json({
      status: "fail",
      message: `Can't find student with ID: ${id}`,
    });
  }
  fs.readFileSync("./");

  resp.status(200).json({
    status: "success",
    data: {
      student: student,
    },
  });
};

exports.updateStudent = async (req, resp) => {
  const id = req.params.id * 1;
  let student = await students.find((el) => el._id == id);
  if (!student) {
    return resp.status(404).json({
      status: "fail",
      message: `Can't find student with ID: ${id}`,
    });
  }
  Object.assign(student, req.body);
  const index = students.indexOf(student);
  students[index] = student;

  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students),
    (error) => {
      if (error) {
        return resp.status(500).json({
          status: "fail",
          message: "Error occurred, could not save student",
        });
      }
    }
  );
  resp.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
};

exports.deleteStudent = async (req, resp) => {
  const id = req.params.id * 1;
  let student = await students.find((el) => el._id == id);
  if (!student) {
    return resp.status(404).json({
      status: "fail",
      message: `Can't find student with ID: ${id}`,
    });
  }

  const index = students.indexOf(student);
  students.splice(index, 1);

  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students),
    (error) => {
      if (error) {
        return resp.status(500).json({
          status: "fail",
          message: "Error occurred, could not save student",
        });
      }
    }
  );
  resp.status(204).json({
    status: "success",
    data: null,
  });
};
