const asyncHandler = require("express-async-handler");
const TopExperience = require("../models/experienceModel");

//controler to get all experiences/ get filtered and/or paginated experiences
const getExperiences = asyncHandler(async (req, res) => {
  try {
    // Extract query parameters with defaults
    const limit = parseInt(req.query.limit) || 10; // Default limit: 10
    console.log(limit);
    const page = parseInt(req.query.page) || 1; // Default page: 1

    // MongoDB query to paginate results
    const experiences = await TopExperience.find()
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(limit); // Limit the number of documents returned

    // Optional: Include total count for pagination metadata
    const totalExperiences = await TopExperience.countDocuments();

    res.json({
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//controller to get a specific experience by ID
const getExperience = asyncHandler(async (req, res) => {
  const experience = await TopExperience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience Not Found");
  }

  res.sendStatus(200).json(experience);
});

//controller to create a new experience
const createExperience = asyncHandler(async (req, res) => {
  const { name, country, description, image, type, tags, submittedBy } =
    req.body;

  // Validate required fields
  if (!name || !country || !description || !image || !type || !submittedBy) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  const experience = await TopExperience.create({
    name,
    country,
    description,
    image,
    type,
    tags,
    submittedBy,
  });
  res.json(experience);
});

//controller to update an experience
const updateExperience = asyncHandler(async (req, res) => {
  const experience = await TopExperience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience Not Found");
  }

  const updatedExperience = await TopExperience.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedExperience);
});

//controller to delete an experience
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await TopExperience.findById(req.params.id);
  if (!experience) {
    res.status(404);
    throw new Error("Experience Not Found");
  }

  const deletedExperience = await TopExperience.findByIdAndDelete(
    req.params.id
  );
  res.status(200).json({ message: `Deleted event ${deletedExperience}` });
});

module.exports = {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
};
