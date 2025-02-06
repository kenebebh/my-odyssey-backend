import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//controller to get all users
//public access
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//controller to get a specific user by ID
//public access
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);

    if (!user) {
      res.status(404).json({ message: "Can't find user" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next();
  }
};

//controller to create a new user
//public access
const createUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    userImage,
    gender,
    dateOfBirth,
    savedTripsCount,
    verified,
    deactivated,
    phone,
    address,
    city,
    country,
    lastLoginDate,
    bookedTrips,
    travelHistory,
    savedWishlists,
    avgSessionDuration,
    activityStatus,
    travelInterests,
    preferredDestinations,
    supportTickets,
    appRatings,
  } = req.body;

  if (!firstName || !lastName || !email || !gender || !dateOfBirth) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    userImage,
    gender,
    dateOfBirth,
    savedTripsCount,
    verified,
    deactivated,
    phone,
    address,
    city,
    country,
    lastLoginDate,
    bookedTrips,
    travelHistory,
    savedWishlists,
    avgSessionDuration,
    activityStatus,
    travelInterests,
    preferredDestinations,
    supportTickets,
    appRatings,
  });
  res.json(user);
});

//controller to update a users details
//public access
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "Can't find user" });
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
    res.status(404).json({ message: "Can't find user" });
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Deleted user ${req.params.id}` });
});

export { getUsers, getUser, createUser, updateUser, deleteUser };
