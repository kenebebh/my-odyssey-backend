const mongoose = require("mongoose");

// Sub-schemas for nested objects
const tripInfoSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: false,
  },
  date: {
    type: String, // You can use Date type if you want to store dates more precisely
    required: false,
  },
});

const wishlistSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
});

const supportTicketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
    enum: ["Open", "Resolved", "Pending"], // You can define allowed values
  },
});

const ratingSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: false,
    min: 1,
    max: 5, // Assuming a 5-star rating system
  },
  comment: {
    type: String,
    required: false, // Comment is optional
  },
});

// Main User schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add user's first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add user's last name"],
    },
    email: {
      type: String,
      required: [true, "Please add user's email address"],
    },
    userImage: {
      type: String,
      required: [true, "Please add an image"],
    },
    gender: {
      type: String,
      required: [true, "Please add user's gender"],
      enum: ["Male", "Female", "Non-binary", "Other"], // Example options
    },
    dateOfBirth: {
      type: String, // You can also use Date type for proper date handling
      required: [true, "Please add user's date of birth"],
    },
    savedTripsCount: {
      type: Number,
      required: [true, "Please add count of saved trips"],
    },
    verified: {
      type: String,
      required: [true, "Please add user's verification status"],
    },
    deactivated: {
      type: Boolean,
      required: [true, "Please add deactivation status"],
      default: false,
    },
    phone: {
      type: Number,
      required: [true, "Please add user's phone number"],
    },
    address: {
      type: String,
      required: [true, "Please add user's address"],
    },
    city: {
      type: String,
      required: [true, "Please add user's city"],
    },
    country: {
      type: String,
      required: [true, "Please add user's country"],
    },
    lastLoginDate: {
      type: String,
      required: [true, "Please add user's last login date"],
    },
    bookedTrips: [tripInfoSchema],
    travelHistory: [tripInfoSchema],
    savedWishlists: [wishlistSchema],
    avgSessionDuration: {
      type: String,
      required: false,
    },
    activityStatus: {
      type: String,
      required: false,
      enum: ["Active", "Inactive"],
    },
    travelInterests: {
      type: [String], // Array of strings for multiple interests
      default: [],
    },
    preferredDestinations: {
      type: [String], // Array of strings for preferred destinations
      default: [],
    },
    supportTickets: [supportTicketSchema],
    appRatings: [ratingSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
