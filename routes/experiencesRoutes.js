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
router.route("/:id").patch(updateExperience);

//delete an experience
router.route("/:id").delete(deleteExperience);

module.exports = router;
