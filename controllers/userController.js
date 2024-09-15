const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//controller to get all users
//public access
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//controller to get a specific user by ID
//public access
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  res.status(200).json(user);
});

//controller to create a new user
//public access
const createUser = asyncHandler(async (req, res) => {
  const { username, email, userImage, location } = req.body;
  if (!username || !email || !location) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const user = await User.create({
    username,
    email,
    userImage,
    location,
  });
  res.json(user);
});

//controller to update a users details
//public access
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

//controller to delete a user
//public access
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Deleted user ${req.params.id}` });
});

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
