const User = require("../model/user.model");
const VerificationCodeSend = require("../services/VerificationCodeSend");
const DecodeToken = require("../util/DecodeToken");
const verificationToken = require("../util/verificationToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({
        message: "credentials are Required"
      })
    }
    const existedUser = await User.findOne({ email }).select("-password");

    if (existedUser) {
      return res.status(409).json({
        message: "User already Existed"
      })
    }

    const { token, expiry } = verificationToken();

    const tokenSendToMail = await VerificationCodeSend(token, email);

    if (tokenSendToMail.status != 200) {
      return res.status(500).json({ message: "Verification Code Not send!", error: tokenSendToMail.error })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName, lastName, email, password: hashPassword, verificationCode: token, verifiicationCodeExpiry: expiry
    })

    await newUser.save();


    return res.status(201).json({
      message: "User Created Sucessfully!",
      newUser

    })
  } catch (error) {
    return res.json({
      message: "Error comes in Signup",
      error
    })
  }
}


const verifyMail = async (req, res) => {

  try {
    const { token } = req.params;

    const existedUser = await User.findOne({
      verificationCode: token,
      verifiicationCodeExpiry: { $gt: Date.now() }
    })

    if (!existedUser) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    existedUser.verified = true;
    existedUser.verificationToken = undefined;
    existedUser.verificationTokenExpires = undefined;

    await existedUser.save();

    return res.json({ message: "Account verified successfully" });


  } catch (error) {
    return res.json({
      message: "Error comes in Verification",
      error
    })
  }


}




const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "credentials are Required"
      })
    }

    const existedUser = await User.findOne({ email }).select("-verificationCode -verificationTokenExpires");


    if (!existedUser) {
      return res.status(404).json({
        message: "credentials are incorrect"
      })
    }

    if (!existedUser.verified) {
      return res.status(401).json({
        message: "Email is not Verified!"
      })
    }

    const comparePass = await bcrypt.compare(password, existedUser.password);


    if (!comparePass) {
      return res.status(401).json({
        message: "credentials are incorrect"
      })
    }


    const token = jwt.sign({ userId: existedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000
    })

    return res.status(200).json({
      message: "Login successfully",
      user: existedUser
    })

  } catch (error) {
    return res.json({
      message: "Error comes in Login",
      error
    })
  }
}




const me = async (req, res) => {

  const { userId } = DecodeToken(req);

  console.log(userId);

  const user = await User.findById({ _id: userId }).select("-password -verificationCode -verifiicationCodeExpiry");


  return res.status(200).json({
    message: "User Fetched successfully",
    user
  })
}


module.exports = { signup, verifyMail, login, me }