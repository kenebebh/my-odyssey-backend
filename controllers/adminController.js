import mongoose from "mongoose";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminModel.js";

//controller to get all admins
//route GET /api/admin
//@access private
const getAllAdmins = async (req, res, next) => {
  res.status(200).json({ message: "Get all Admins" });
};

//controller to authenticate an admin/set token
//route POST /api/admin/auth
//@access public
const authenticateAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    //compare password
    const isValidPassword = await admin.comparePassword(password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    //Generate JWT Token
    generateToken(res, admin._id);

    //Send response
    res.status(200).json({
      success: true,
      data: {
        id: admin._id,
        firstname: admin.firstName,
        lastname: admin.lastName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error during admin authentication:", error.message);
    next(error);
  }
};

//controller to register a new admin
//route POST /api/admin
//@access public
const registerAdmin = async (req, res, next) => {
  const admin = req.body;

  const adminExists = await Admin.findOne({ email: admin.email });

  if (adminExists) {
    res.status(400).json({ success: false, message: "Admin exists already" });
  }

  try {
    generateToken(res, admin.id);
    res.status(201).json({ success: true, data: newAdmin });
  } catch (error) {
    console.error(
      "An error occured while creating a new admin: ",
      error.message
    );
    next(error);
  }
};

//controller to logout an admin
//route POST /api/admin/logout
//@access public
const logoutAdmin = async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out Admin" });
};

//controller to get admin details
//route GET /api/admin
//@access private
const getAdminDetails = async (req, res, next) => {
  res.status(200).json({ message: "Get Admin Details" });
};

//controller to update admin details
//route PATCH /api/admin
//@access private
const updateAdminDetails = async (req, res, next) => {
  res.status(200).json({ message: "Update Admin Details" });
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Admin Not Found" });
  }

  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: `Deleted admin ${id}` });
  } catch (error) {
    console.error("Something went wrong, please try again.");
    next(error);
  }
};

export {
  authenticateAdmin,
  getAdminDetails,
  getAllAdmins,
  logoutAdmin,
  registerAdmin,
  updateAdminDetails,
  deleteAdmin,
};
