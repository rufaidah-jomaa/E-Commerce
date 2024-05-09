import nodemailer from 'nodemailer'
export async function sendEmail(to,subject,html) {
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
      html // html body
    });
  
    return info;
  }
  

  