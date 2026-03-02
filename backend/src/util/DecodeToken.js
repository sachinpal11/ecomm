const jwt = require("jsonwebtoken")

const DecodeToken = async (req) => {
  try {
    const { token } = req.cookies;

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {

    }

  } catch (error) {

  }


}



module.exports = DocodeToken;