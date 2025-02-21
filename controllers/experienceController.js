// import asyncHandler from "express-async-handler";
import TopExperience from "../models/experienceModel.js";
import mongoose from "mongoose";

//controler to get all experiences/ get filtered and/or paginated experiences
const getExperiences = async (req, res, next) => {
  try {
    // Extract query parameters with defaults
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // MongoDB query to paginate results
    const experiences = await TopExperience.find()
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(limit); // Limit the number of documents returned

    // Optional: Include total count for pagination metadata
    const totalExperiences = await TopExperience.countDocuments();

    res.status(200).json({
      data: experiences,
      meta: {
        total: totalExperiences,
        page,
        limit,
        totalPages: Math.ceil(totalExperiences / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    next(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
};

//controller to get a specific experience by ID
const getExperience = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Experience Not Found" });
  }

  try {
    const experience = await TopExperience.findById(id);
    res.status(200).json({ success: true, experience: experience });
  } catch (error) {
    console.error(
      "An error occured while fetching this experience: ",
      error.message
    );
    next(error);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//controller to create a new experience
const createExperience = async (req, res, next) => {
  const experience = req.body;

  // Validate required fields
  if (
    !experience.name ||
    !experience.country ||
    !experience.description ||
    !experience.image ||
    !experience.type ||
    !experience.submittedBy
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  const newExperience = new TopExperience(experience);
  try {
    await newExperience.save();
    res.status(201).json({ success: true, data: newExperience });
  } catch (error) {
    console.error(
      "An error occured while creating a top experience: ",
      error.message
    );
    next(error);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//controller to update an experience
const updateExperience = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Experience not found" });
  }

  try {
    const updatedExperience = await TopExperience.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, data: updatedExperience });
  } catch (error) {
    console.error(
      "An error occurred while uodating the experience: ",
      error.message
    );
    next(error);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//controller to delete an experience
const deleteExperience = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Experience not found" });
  }

  try {
    const deletedExperience = await TopExperience.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `Deleted experience ${id} successfully`,
    });
  } catch (error) {
    console.error("Something went wrong, please try again.");
    next(error);
  }
};

export {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
