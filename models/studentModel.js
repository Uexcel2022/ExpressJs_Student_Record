const mongoose = require("mongoose");
const CustomError = require("./../utils/customError");
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

  DOB: {
    type: Date,
    validate: {
      validator: function (value) {
        const yearOfBirth = new Date(value).getFullYear();
        const monthOfBirth = new Date(value).getMonth();
        const monthDayOfBirth = new Date(value).getDate();

        let age = new Date().getFullYear() - yearOfBirth;

        if (new Date().getMonth() < monthOfBirth) {
          age = age - 1;
        } else if (new Date().getDate() < monthDayOfBirth) {
          age = age - 1;
        }
        return age >= 18;
      },
      message: "You must be 18 years of age or above to be eligible",
    },
  },

  email: {
    type: String,
    unique: [true, "The email is being uesd by aother student."],
  },
  phone: {
    type: String,
    required: [true, "Phone number is a required field"],
    unique: [true, "The phone number is being uesd by aother student."],
  },

  addmissionYear: {
    type: Number,
    required: [true, "Phone number is a required field"],
    validate: {
      validator: function (value) {
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

  year1: {
    type: [Object],
    sem1: [Object],
    sem2: [Object],
  },
  year2: {
    type: [Object],
    sem1: [Object],
    sem2: [Object],
  },

  year3: {
    type: [Object],
    sem1: [Object],
    sem2: [Object],
  },
  year4: {
    type: [Object],
    sem1: [Object],
    sem2: [Object],
  },
});

studentSchema.pre(/^find/, function (next) {
  this.find().select("-__v");
  next();
});

const student = mongoose.model("student", studentSchema);

module.exports = student;
