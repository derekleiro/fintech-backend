const Stream = require("../models/student");
const Students = require("../models/student");

// Adding a new stream
exports.addStream = async (req, res, next) => {
  const { streamName } = req.body;

  const newStream = new Student({
    streamName,
    streamID: Math.floor(Math.random() * 9999999999999999999),
  });

  try {
    await newStream.save();
  } catch (e) {
    const error = new HttpError("Error saving new student", 500);
    return next(error);
  }
};

// Get all the streams
exports.getStreams = async (req, res, next) => {
  let streams;
  try {
    streams = await Stream.find({});
  } catch (e) {
    const error = new HttpError("Error fetching streams", 500);
    return next(error);
  }

  if (streams) {
    return res.json({ strenas });
  } else {
    return res.json({ Error: "No streams found" });
  }
};


// Get students that below to a particular stream
exports.getStudents = async (req, res, next) => {
    const { streamID } = req.body;
  
    let students;
    try {
      students = await Students.find({ streamID });
    } catch (e) {
      const error = new HttpError("Error fetching students", 500);
      return next(error);
    }
  
    if (students) {
      return res.json({ students });
    } else {
      return res.json({ Error: "No students found" });
    }
  };
