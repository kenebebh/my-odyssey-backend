const mongoose = require("mongoose");

const eventMetricsSchema = new mongoose.Schema({
  attendees: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  impressions: {
    type: Number,
    required: true,
    default: 0,
  },
  ticketsBooked: {
    type: Number,
    required: true,
    default: 0,
  },
});

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add an event name"],
    },
    startDate: {
      type: Date,
      required: [true, "Please add a start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please add an end date"],
    },
    country: {
      type: String,
      required: [true, "Please add the event country"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    image: {
      type: String,
      required: [true, "Please add an event image URL"],
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Upcoming"],
      required: [true, "Please add the event status"],
      default: "Upcoming",
    },
    location: {
      type: String,
      required: [true, "Please add the event location"],
    },
    startTime: {
      type: String,
      required: [true, "Please add the event start time"],
    },
    endTime: {
      type: String,
      required: [true, "Please add the event end time"],
    },
    ticketPrice: {
      type: String,
      required: [true, "Please add the ticket price"],
    },
    ticketAvailability: {
      type: String,
      enum: ["Available", "Sold Out"],
      required: [true, "Please add the ticket availability status"],
      default: "Available",
    },
    gallery: {
      type: [String], // Array of image URLs
      required: [false],
    },
    ads: {
      type: [String], // Array of ad names
      required: [false],
    },
    adStatus: {
      type: String,
      enum: ["Running", "Paused", "Ended"],
      required: [true, "Please add the ad status"],
      default: "Running",
    },
    metrics: {
      type: eventMetricsSchema,
      required: true,
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Event", eventSchema);
