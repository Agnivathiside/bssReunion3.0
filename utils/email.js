import nodemailer from 'nodemailer';
import fs from 'fs';

export const sendEmailWithAttachment = async (email, name, attachmentPath) => {
  const htmlContent = `
    <html>
      <body>
        <p>Hello ${name},</p>
        <p>Thank you for submitting your information.</p>
        <p>We are so glad that you are coming!</p>
        <p>Attached is your unique QR code image.</p>
        <p>Best regards,<br>Your Company</p>
      </body>
    </html>`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject: 'Milan Pass!',
    html: htmlContent,
    attachments: [
      {
        filename: `composite_${email}.png`,
        path: attachmentPath,
        cid: 'unique@qr.code'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);

    fs.unlink(attachmentPath, (err) => {
      if (err) {
        console.error('Error deleting the composite image file:', err);
      }
    });
  });
};
