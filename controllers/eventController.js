const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

//controller to get all events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

//controller to get a specific event by ID
const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event Not Found");
  }

  res.status(200).json(event);
});

//controller to create a new event
// const createEvent = asyncHandler(async (req, res) => {

// })
