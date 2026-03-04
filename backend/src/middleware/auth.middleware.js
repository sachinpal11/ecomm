const DecodeToken = require("../util/DecodeToken")



const authMiddleware = async (req, res, next) => {
  try {
    const decoded = DecodeToken(req);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized! Please Login"
    })
  }
}


module.exports = authMiddleware