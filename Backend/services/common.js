const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "nikhiltiwari0100@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.sendMail = async function ({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"E-commerce" <nikhiltiwari0100@gmail.com>', // sender address
    to,
    subject,
    text, 
    html
  });

  return info;

};
