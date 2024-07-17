const nodemailer = require('nodemailer');
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_MAIL, SMTP_PASSWORD } = process.env;

function replaceContent(content, creds) {
    let allkeysArr = Object.keys(creds);
    allkeysArr.forEach(function (key) {
        content = content.replace(`#{${key}}`, creds[key]);
    })
    return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
    try {
        const templatePath = path.join(__dirname, "email_templates", templateName);
        let content = await fs.promises.readFile(templatePath, "utf-8");

        const emailDetails = {
            to: receiverEmail,
            from: SMTP_MAIL,
            subject: 'RESET OTP',
            text: `Hi ${creds.name}, this is your reset OTP: ${creds.otp}`,
            html: replaceContent(content, creds),
        };

        const transportDetails = {
            host: SMTP_HOST,
            port: SMTP_PORT,
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD
            }
        };

        const transporter = nodemailer.createTransport(transportDetails);
        await transporter.sendMail(emailDetails);
        console.log("Email Sent Successfully.");
    } catch (err) {
        console.log("Email not sent. Check Error Below:")
        console.log(err);
    }
}

module.exports = EmailHelper;