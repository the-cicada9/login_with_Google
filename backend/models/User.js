const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String, // Optional, only for self-auth users
    },
    picture: {
      type: String, // Stores user's profile picture URL
    },
    authSource: {
      type: String,
      enum: ["self", "google"],
      default: "self",
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model("User", userSchema);
