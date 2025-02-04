const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

//controller to get all events and get with filtering or pagination if filter/pagination query was provided
const getEvents = asyncHandler(async (req, res) => {
  // const events = await Event.find();
  // res.json(events);

  try {
    // Extract query parameters with defaults
    const limit = parseInt(req.query.limit) || 10; // Default limit: 10
    console.log(limit);
    const page = parseInt(req.query.page) || 1; // Default page: 1

    // MongoDB query to paginate results
    const events = await Event.find()
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(limit); // Limit the number of documents returned

    // Optional: Include total count for pagination metadata
    const totalEvents = await Event.countDocuments();

    res.json({
      data: events,
      meta: {
        total: totalEvents,
        page,
        limit,
        totalPages: Math.ceil(totalEvents / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//controller to get a specific event by ID
const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404).json({ message: "Event Not Found" });
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
    res.status(404).json({ message: "Event Not Found" });
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
    res.status(404).json({ message: "Event Not Found" });
  }

  const deletedEvent = await Event.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Deleted event ${deletedEvent}` });
});

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
