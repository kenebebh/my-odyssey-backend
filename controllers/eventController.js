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
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    startDate,
    endDate,
    country,
    description,
    image,
    status,
    location,
    startTime,
    endTime,
    ticketPrice,
    ticketAvailability,
    gallery,
    ads,
    adStatus,
    metrics,
  } = req.body;

  if (!name || !startDate || !endDate || !location) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const event = await Event.create({
    name,
    startDate,
    endDate,
    country,
    description,
    image,
    status,
    location,
    startTime,
    endTime,
    ticketPrice,
    ticketAvailability,
    gallery,
    ads,
    adStatus,
    metrics,
  });
  res.json(event);
});
