"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(recipient, ticketId) {
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.mail_user,
      pass: process.env.mail_pass
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Lora Event 👻" <abassademak@gmail.com>', // sender address
    to: recipient,
    subject: "Hello From Lora Event ✔",
    text: `Your ticket has ben booked with ticketId: ${ticketId}`,
    html: "<b>Hello world?</b>"
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = main;
