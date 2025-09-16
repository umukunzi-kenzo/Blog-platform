const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // removes spaces before/after
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // store all emails in lowercase
    },
    password: {
      type: String,     
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // can only be user or admin
      default: "user",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// To Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // if password wasn’t changed, skip hashing
  }
  const salt = await bcrypt.genSalt(10); // generate salt
  this.password = await bcrypt.hash(this.password, salt); // hash password
  next();
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

// Export model so we can use it elsewhere
module.exports = User;


