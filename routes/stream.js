const express = require("express");
const streamControllers = require("../controllers/stream-controllers");
const router = express.Router();

router.get("/streams", streamControllers.getStreams);
router.get("/students", streamControllers.getStudents);
router.post("/stream/add", streamControllers.addStream);

module.exports = router;
