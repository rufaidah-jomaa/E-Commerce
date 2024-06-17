import nodemailer from 'nodemailer'
import { emailTemplate } from './emailTemplete.js';
import fs from 'fs'
import pkg from 'pdfkit';
import path from 'path'
export async function sendEmail(to,subject,username,token,subjectC,file) {
  const  attachment= {
    filename: file,
    path:file // Path to your PDF file
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
      html:emailTemplate(to,username,token,subjectC,attachment),
    });
  
    return info;
  }
  
  