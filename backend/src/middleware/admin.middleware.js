const DecodeToken = require("../util/DecodeToken")



const adminMiddleware = async (req, res, next) => {
  try {
    const decoded = DecodeToken(req);
    console.log("from decoded:", decoded);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    if (decoded.role !== 'admin') {
      return res.status(401).json({
        message: "Unauthorized! Only Admin can Use this!"
      })
    }
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized! Please Login",
      err
    })
  }
}


module.exports = adminMiddleware