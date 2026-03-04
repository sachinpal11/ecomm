const jwt = require("jsonwebtoken")

const DecodeToken = (req) => {
  try {
    const { token } = req.cookies;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;

  } catch (error) {
    return null
  }


}



module.exports = DecodeToken;