const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationCode: String,
  verifiicationCodeExpiry: Date,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});


const User = mongoose.model("user", UserSchema);

module.exports = User;