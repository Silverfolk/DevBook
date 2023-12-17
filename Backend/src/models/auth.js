const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: {
     type: String,
     required: true,
     trim: true,
     min: 3,
     max: 20,
  },
  lastName: {
     type: String,
     required: true,
     trim: true,
     min: 3,
     max: 20,
  },
  username: {
     type: String,
     required: true,
     trim: true,
     unique: true,
     lowercase: true,
     index: true,
  },
  email: {
     type: String,
     required: true,
     trim: true,
     unique: true,
     lowercase: true,
  },
  hash_password: {
     type: String,
     required: true,
  },
  role: {
     type: String,
     enum: ["user", "admin"],
     default: "user",
  },
  avatar:{
   type: String,
  },
  contactNumber: {
     type: String,
  },
  profilePicture: {
     type: String,
  },
},{ timestamps: true });
//For get fullName from when we get data from database
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.method({
  async authenticate(password) {
     return bcrypt.compare(password, this.hash_password);
  },
});
module.exports = mongoose.model("User", userSchema);