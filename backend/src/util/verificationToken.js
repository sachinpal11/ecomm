const crypto = require("crypto");

const verificationToken = () => {

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 60 * 60 * 1000;


  return { token, expiry };

}


module.exports = verificationToken;