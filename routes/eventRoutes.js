import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

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

export default router;
