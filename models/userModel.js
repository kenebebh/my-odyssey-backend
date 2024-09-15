const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add User's name"],
    },
    email: {
      type: String,
      required: [true, "Please add User's email address"],
    },
    userImage: {
      type: String,
      required: [false],
    },
    location: {
      type: String,
      required: [true, "Please add User's location"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
