import mongoose from "mongoose";
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
  res.status(200).json({ message: "Authenticate Admin" });
};

//controller to register a new admin
//route POST /api/admin
//@access public
const registerAdmin = async (req, res, next) => {
  res.status(200).json({ message: "Register Admin" });
};

//controller to logout an admin
//route POST /api/admin/logout
//@access public
const logoutAdmin = async (req, res, next) => {
  res.status(200).json({ message: "Logout Admin" });
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

export {
  authenticateAdmin,
  getAdminDetails,
  getAllAdmins,
  logoutAdmin,
  registerAdmin,
  updateAdminDetails,
};
