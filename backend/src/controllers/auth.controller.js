const User = require("../model/user.model");
const VerificationCodeSend = require("../services/VerificationCodeSend");
const DecodeToken = require("../util/DecodeToken");
const verificationToken = require("../util/verificationToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    if (!email || !password || !firstName) {
      return res.status(400).json({
        message: "First name, email and password are required",
      });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const { token, expiry } = verificationToken();

    const tokenSendToMail = await VerificationCodeSend(token, email);

    if (tokenSendToMail.status !== 200) {
      return res.status(500).json({
        message: "Failed to send verification email",
        error: tokenSendToMail.error,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      verificationCode: token,
      verifiicationCodeExpiry: expiry,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully. Please verify your email.",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        verified: newUser.verified,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong during signup",
      error: error.message,
    });
  }
};

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

    return res.json({
      message: "Account verified successfully", user: {
        firstName: existedUser.firstName,
        lastName: existedUser.lastName,
        email: existedUser.email,
        role: existedUser.role,
        verified: true
      }
    });


  } catch (error) {
    return res.json({
      message: "Error comes in Verification",
      error
    })
  }


}


const resendMail = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "User already verified"
      });
    }

    const { token, expiry } = verificationToken();

    const tokenSendToMail = await VerificationCodeSend(token, email);

    if (tokenSendToMail.status != 200) {
      return res.status(500).json({ message: "Verification Code Not send!", error: tokenSendToMail.error })
    }

    user.verificationCode = token;
    user.verifiicationCodeExpiry = expiry;

    await user.save();


    return res.json({
      message: "Verification email sent successfully"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Error sending verification email",
      error: error.message
    });

  }
};



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


    const token = jwt.sign({ userId: existedUser._id, role: existedUser.role }, process.env.JWT_SECRET, {
      expiresIn: "30d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 * 1000
    })

    return res.status(200).json({
      message: "Login successfully",
      user: {
        firstName: existedUser.firstName,
        lastName: existedUser.lastName,
        email: existedUser.email,
        role: existedUser.role,
        verified: true,
        loggedIn: true
      }
    })

  } catch (error) {
    return res.json({
      message: "Error comes in Login",
      error
    })
  }
}



const logout = async (req, res) => {
  try {

    res.cookie("token", "", {
      maxAge: new Date(0)
    });

    return res.json({
      message: "logout successfully!"
    })

  } catch (error) {
    return res.status(500).json({
      message: "error in logout",
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





module.exports = { signup, verifyMail, resendMail, login, me, logout }