require("dotenv").config();
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sachinraja709@gmail.com",
    pass: "ehns xnev djum etur",
  },
});
const VerificationCodeSend = async (token, email) => {

  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;


  const info = await transporter.sendMail({
    from: "sachinraja207@gmail.com",
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: `<b>${verifyUrl}</b>`, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);

  return {
    message: "email send sucessfully",
    messageID: info.messageId,
    status: 200
  }
}


VerificationCodeSend(123, "sachinpal2076@gmail.com");


module.exports = VerificationCodeSend;