import nodemailer from "nodemailer";

export const sendMailToAlumni = async (email, Name, registration_id) => {
    const htmlContent = `
    <html>
    <body>
        <p>Dear ${Name},</p>
        <p>Yes, now you are a part of the alumni association.</p>
        <p>Your registration ID is: <strong>${registration_id}</strong></p>
    </body>
    </html>
    `
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
        subject: 'Welcome to the BSS ALUMNI ASSOCIATION',
        html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
}