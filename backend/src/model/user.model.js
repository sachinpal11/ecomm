const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true },
  verified: { type: Boolean, default: false },
  verificationCode: String,
  verifiicationCodeExpiry: Date
});


const User = mongoose.model("user", UserSchema);

module.exports = User;