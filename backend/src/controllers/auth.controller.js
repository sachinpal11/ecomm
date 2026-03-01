const User = require("../model/user.model");
const VerificationCodeSend = require("../services/VerificationCodeSend");
const verificationToken = require("../util/verificationToken");



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

    const tokenSendToMail = await VerificationCodeSend(token);

    if (tokenSendToMail.status != 200) {
      return res.status(500).json({ message: "Verification Code Not send!" })
    }


    const newUser = new User({
      firstName, lastName, email, password, verificationCode: token, verifiicationCodeExpiry: expiry
    })

    await newUser.save();


    return res.status(201).json({
      message: "User Created Sucessfully!",

    })
  } catch (error) {
    return res.json({
      message: "Error comes in Signup",
      error
    })
  }
}




const login = async (req, res) => {
  const { email, password } = req.body;
}





module.exports = { signup }