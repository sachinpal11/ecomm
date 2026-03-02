const DecodeToken = require("../util/DecodeToken")



const authMiddleware = async (req, res, next) => {
  try {
    const decoded = DecodeToken(req);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    console.log("under auth middleware", decoded);
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized! Please Login"
    })
  }
}


module.exports = authMiddleware