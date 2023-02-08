const Student = require("../models/student");

// Adding a new student to a particular stream
exports.addStudent = async (req, res, next) => {
  const { studentName, studentStream } = req.body;

  const newStudent = new Student({
    studentName,
    studentStream,
    studentID: Math.floor(Math.random() * 9999999999999999999),
  });

  try {
    await newStudent.save();
  } catch (e) {
    const error = new HttpError("Error saving new student", 500);
    return next(error);
  }
};

// Get a particular student
exports.getStudent = async (req, res, next) => {
  const { studentID } = req.body;

  let student;
  try {
    student = await Student.findOne({ studentID });
  } catch (e) {
    const error = new HttpError("Error fetching student data", 500);
    return next(error);
  }

  if (student) {
    return res.json({ student });
  } else {
    return res.json({ Error: "No student found" });
  }
};

// Edit a particular student
exports.editStudent = async (req, res, next) => {
  const { studentID, studentName, studentStream } = req.body;

  try {
    await Student.findOneAndUpdate(
      { studentID },
      {
        studentName,
        studentStream,
      }
    );
  } catch (e) {
    console.log(e);
    const error = new HttpError(
      "There was an error updating the student info",
      500
    );
    return next(error);
  }
};

// Delete a particular student
exports.deleteStudent = async (req, res, next) => {
  const { studentID } = req.body;

  try {
    await Student.deleteOne({ studentID });
  } catch (e) {
    console.log(e);
    const error = new HttpError("There was an error deleting the student", 500);
    return next(error);
  }
};
