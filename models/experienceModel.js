const mongoose = require("mongoose");

const topExperienceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the experience name"],
    },
    country: {
      type: String,
      required: [true, "Please add the country"],
    },
    description: {
      type: String,
      required: [true, "Please add a description for this experience"],
    },
    image: {
      type: String,
      required: [true, "Please add at least one image url"],
    },
    type: {
      type: String,
      enum: ["Luxury", "Cultural", "Adventure", "Budget"], // Predefined categories
    },
    votes: {
      type: Number,
      default: 0, // Number of users who voted for this experience
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user who submitted this experience
      ref: "User",
    },
    tags: {
      type: [String], // Array of tags for filtering/searching (e.g., ["castle", "tour", "Germany"])
      default: [],
    },
    ratings: {
      average: {
        type: Number,
        default: 0, // Average rating calculated from user votes
        min: 0,
        max: 5,
      },
      totalVotes: {
        type: Number,
        default: 0, // Total number of ratings submitted
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Transform the document when converting to JSON
topExperienceSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const TopExperience = mongoose.model("TopExperience", topExperienceSchema);

module.exports = TopExperience;
