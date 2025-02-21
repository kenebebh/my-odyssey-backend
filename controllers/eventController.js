import Event from "../models/eventModel.js";
import mongoose from "mongoose";

//controller to get all events and get with filtering or pagination if filter/pagination query was provided
const getEvents = async (req, res, next) => {
  try {
    res.status(401);
    throw new Error("I created this error");

    // Extract query parameters with defaults
    const limit = parseInt(req.query.limit) || 10; // Default limit: 10
    // console.log(limit);
    const page = parseInt(req.query.page) || 1; // Default page: 1

    // MongoDB query to paginate results
    const events = await Event.find()
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(limit); // Limit the number of documents returned

    // Optional: Include total count for pagination metadata
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
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
    next(error);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//controller to get a specific event by ID
const getEvent = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Event Not Found" });
  }

  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json({ success: true, event: event });
  } catch (error) {
    console.error("An error occurred while fetching the user: ", error.message);
    next(error);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//controller to create a new event
const createEvent = async (req, res, next) => {
  const event = req.body;

  if (!event.name || !event.startDate || !event.endDate || !event.location) {
    res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  }

  const newEvent = new Event(event);

  try {
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("An error occurred while creating the user: ", error.message);
    next(error);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//controller to update an event
const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Event Not Found" });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json({ success: true, data: updatedEvent });
  } catch (error) {
    console.error(
      "An error occurred while updating this event: ",
      error.message
    );
    next(error);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//controller to delete an event
const deleteEvent = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Event Not Found" });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `Deleted event ${id} successfully`,
    });
  } catch (error) {
    console.error("Something went wrong, please try again.");
    next(error);
  }
};

export { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
