import express from "express";
import {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = express.Router();

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

export default router;
