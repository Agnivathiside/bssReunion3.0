import nodemailer from 'nodemailer';
import fs from 'fs';

export const sendEmailWithAttachment = async (email, name, attachmentPath) => {
  const lis = name.split(" ")
  const lastName = lis[-1];
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Confirmation and QR Code for Milan Pass</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
        }
        .header, .footer {
            text-align: center;
            padding: 10px 0;
        }
        .content {
            margin: 20px 0;
        }
        .details {
            margin: 20px 0;
        }
        .details p {
            margin: 5px 0;
        }
        .highlight {
            font-weight: bold;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Confirmation and QR Code for Milan Pass</h2>
        </div>
        <div class="content">
            <p>Dear Ms ${lastName},</p>
            <p>I hope this message finds you in good health. On behalf of The BSS Alumni, I extend our warmest greetings to you.</p>
            <p>Thank you for expressing your interest in our upcoming event. We are pleased to confirm your participation and look forward to welcoming you.</p>
            <div class="details">
                <p class="highlight">Date:</p>
                <p>29th September, 2024</p>
                <p class="highlight">Time:</p>
                <p>4:00 PM IST Onwards (Entry starts at 3:00 PM IST)</p>
                <p class="highlight">Venue:</p>
                <p>The BSS School</p>
                <p class="highlight">Dress Code:</p>
                <p>Timeless Elegance</p>
                <p><em>Note: Show up in styles from your favourite decade between ’50s and today, or light up the party in an elegant attire that reflects the timeless nature of MILAN.</em></p>
            </div>
            <p>Kindly find attached your unique QR code for your Milan Pass. Please present this QR code at the entrance on the event day to collect your Pass.</p>
            <p>Please feel free to contact us for any further queries.</p>
            <p>Thank you once again for your participation and we look forward to seeing you at the event.</p>
        </div>
        <div class="footer">
            <p>Best regards,</p>
            <p>The BSS School Alumni Association</p>
        </div>
    </div>
</body>
</html>
`;

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
