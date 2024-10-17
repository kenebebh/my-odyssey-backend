const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

//get all events
router.route("/").get(getEvents);

//get event by ID
router.route("/:id").get(getEvent);

//create an event
router.route("/").post(createEvent);

//edit details for a particular event
router.route("/:id").patch(updateEvent);

//delete an event
router.route("/:id").delete(deleteEvent);

module.exports = router;
