import express from "express";
import {
  authenticateAdmin,
  getAdminDetails,
  getAllAdmins,
  logoutAdmin,
  registerAdmin,
  updateAdminDetails,
} from "../controllers/adminController.js";

const router = express.Router();

//get all admins
router.route("/").get(getAllAdmins);

//register an admin
router.route("/").post(registerAdmin);

//authenticate an admin
router.route("/auth").post(authenticateAdmin);

//get admin details and update admin details
router.route("/:id").get(getAdminDetails).patch(updateAdminDetails);

//logout admin
router.route("/logout").post(logoutAdmin);

export default router;
