const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

//controller to get all events
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.json(events);
  // try {
  //   const events = await Event.find().lean(); // Use lean() to get plain objects
  //   const transformedEvents = events.map((event) => ({
  //     ...event,
  //     id: event._id,
  //   }));

  //   return res.json(transformedEvents); // Send data with 'id' instead of '_id'
  // } catch (error) {
  //   return res.status(500).json({ message: "Server Error" });
  // }
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

//controller to update an event
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event Not Found");
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEvent);
});

//controller to delete an event
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event Not Found");
  }

  const deletedEvent = await Event.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Deleted event ${deleteEvent}` });
});

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
