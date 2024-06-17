import nodemailer from 'nodemailer'
import { emailTemplate } from './emailTemplete.js';

export async function sendEmail(to,subject,username,token,subjectC,attachFile = false) {
  let attachments = [];
  if (attachFile) {
    attachments.push({
      filename: "invoice.pdf", // Provide a default filename
      path: "invoice.pdf" // Provide the path to the invoice PDF
    });
  }
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.emailSender,
          pass: process.env.emailPassword,
        },
      });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `E-Commerce by Rufaidah Jomaa ${process.env.emailSender}`, // sender address
      to,// list of receivers
      subject, // Subject line 
      html:emailTemplate(username,token,subjectC),
      attachments
    });
  
    return info;
  }
  
  