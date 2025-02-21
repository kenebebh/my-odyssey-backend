import mongoose from "mongoose";
import User from "../models/userModel.js";

//controller to get all users
//public access
const getUsers = async (req, res, next) => {
  try {
    // Extract query parameters, if there is none, use default
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const users = await User.find()
      .skip((page - 1) * limit) //Skip documents for previous pages
      .limit(limit); //Limit the number of documents returned

    //Include total count for pagination metadata
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      data: users,
      meta: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching Users: ", error);
    next(error);
    // res.status(500).json({error: "Internal Server Error"})
  }
};

//controller to get a specific user by ID
const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "User Not Found" });
  }

  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error(
      "An error occured while fetching user details : ",
      error.message
    );
    next(error);
  }
};

//controller to create a new user
const createUser = async (req, res, next) => {
  const user = req.body;

  if (
    !user.firstName ||
    !user.lastName ||
    !user.email ||
    !user.gender ||
    !user.dateOfBirth
  ) {
    res.status(400).json({ error: "Please fill all required fields" });
  }

  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("An error occured while creating a user: ", error.message);
    next(error);
  }
};

//controller to update a users details
const updateUser = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "User Not Found" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("An error occured while updating user: ", error.message);
    next(error);
  }
};

//controller to delete a user
//public access
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "User Not Found" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `Deleted user ${id}` });
  } catch (error) {
    console.error("Something went wrong, please try again.");
    next(error);
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
