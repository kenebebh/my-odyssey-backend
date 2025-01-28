const express = require("express");
const router = express.Router();
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

//get all experiences
router.route("/").get(getExperiences);

//get experience by ID
router.route("/:id").get(getExperience);

//create an experience
router.route("/").post(createExperience);

//edit details for a particular event
router.route("/:id").patch(updateEvent);

//delete an event
router.route("/:id").delete(deleteEvent);

module.exports = router;
