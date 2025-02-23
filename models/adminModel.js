import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "customerservice", "admanager"], // You can adjust or expand roles as needed.
      default: "admin",
    },
    // Indicates if the admin account is active.
    isActive: {
      type: Boolean,
      default: true,
    },
    // Fields for password reset functionality.
    // resetPasswordToken: {
    //   type: String,
    //   default: null,
    // },
    // resetPasswordExpires: {
    //   type: Date,
    //   default: null,
    // },
    // Optionally track the last time the admin logged in.
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

// Pre-save middleware to hash the password if it has been modified or is new.
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// // Instance method to compare a provided password with the stored hash.
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Transform the document when converting to JSON
adminSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Event = mongoose.model("Admin", adminSchema);
export default Event;
