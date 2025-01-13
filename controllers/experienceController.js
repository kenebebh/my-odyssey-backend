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
    const experiences = await Event.find()
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(limit); // Limit the number of documents returned

    // Optional: Include total count for pagination metadata
    const totalExperiences = await Event.countDocuments();

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
