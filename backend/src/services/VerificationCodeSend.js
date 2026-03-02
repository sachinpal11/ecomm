require("dotenv").config();
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});




const htmlCode =(verificationLink)=>{
  return `
  <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Flexora - Verify your email</title>
</head>

<body style="margin:0;padding:0;background:white;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 10px;background:#000000;">
<tr>
<td align="center">

<!-- MAIN CONTAINER -->
<table width="520" cellpadding="0" cellspacing="0" border="0"
style="background:#0b0b0b;border-radius:10px;border:1px solid #1c1c1c;padding:35px;">

  <!-- LOGO / BRAND -->
  <tr>
    <td style="padding-bottom:20px;">
      <h2 style="
        margin:0;
        font-size:20px;
        color:#faff00;
        letter-spacing:1px;
        font-weight:700;
      ">
        FLEXORA
      </h2>
    </td>
  </tr>

  <!-- TITLE -->
  <tr>
    <td>
      <h1 style="
        margin:0;
        font-size:34px;
        line-height:42px;
        color:#ffffff;
        font-weight:700;
      ">
        Verify your email
      </h1>
    </td>
  </tr>

  <!-- DESCRIPTION -->
  <tr>
    <td style="padding-top:14px;padding-bottom:28px;">
      <p style="
        margin:0;
        font-size:18px;
        line-height:28px;
        color:#9a9a9a;
      ">
        Hi there! Use the link below to verify your email and start exploring Flexora.
      </p>
    </td>
  </tr>

  <!-- BUTTON -->
  <tr>
    <td>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center"
          style="
          background:#faff00;
          border-radius:8px;
          box-shadow:0 0 14px rgba(250,255,0,0.35);
          ">
            <a href="${verificationLink}"
            style="
              display:block;
              padding:15px 20px;
              font-size:18px;
              font-weight:bold;
              color:#000000;
              text-decoration:none;
              text-align:center;
            ">
              Verify email
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- FOOTER TEXT -->
  <tr>
    <td style="padding-top:20px;">
      <p style="
        margin:0;
        font-size:14px;
        color:#6f6f6f;
      ">
        Questions? Email us at
        <span style="color:#faff00;">support@flexora.com</span>
      </p>
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
  `
}



const VerificationCodeSend = async (token, email) => {


  try {
    
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${token}`;
  
    const info = await transporter.sendMail({
      from: `"Flexora" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "Verification Link for Ecommerce Site Login",
      text: "Verification Link for Ecommerce Site Login", 
      html: htmlCode(verifyUrl), 
    });



    return {
      message: "email send sucessfully",
      messageID: info.messageId,
      status: 200
    }
  }catch (error) {
      return {
        message: "email failed to send!",
        status: 500,
        error:error
      }
    }

  
}




module.exports = VerificationCodeSend;