const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  matricNumber: {
    type: String,
    unique: [true, "Duplicate matric number"],
    required: [true, "Matriculation number is a required field"],
  },
  surname: {
    type: String,
    required: [true, "surname is a required field"],
  },
  firstName: {
    type: String,
    required: [true, "First name is a required field"],
  },
  lastName: {
    type: String,
    required: [true, "last name is a required field"],
  },

  email: {
    type: String,
    required: [true, "email is a required field"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is a required field"],
  },

  addmissionYear: {
    type: Number,
    required: [true, "Phone number is a required field"],
    validate: {
      validator: function (value) {
        console.log(new Date().getFullYear() * 1);
        return value <= new Date().getFullYear() * 1;
      },
      message: "Invalid admission year",
    },
  },

  course: {
    type: String,
    required: [true, "course is a required field"],
  },

  department: {
    type: String,
    required: [true, "department is a required field"],
  },
  faculty: {
    type: String,
    required: [true, "Faculty is a required field"],
  },

  gardian: {
    type: [String],
    required: [true, "Guidian information is requred"],
  },
});

studentSchema.pre(/^find/, function (next) {
  this.find().select("-__v");
  next();
});

const student = mongoose.model("student", studentSchema);

module.exports = student;
