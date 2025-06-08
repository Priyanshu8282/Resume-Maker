import nodemailer from 'nodemailer'; // nodemailer import
import dotenv from 'dotenv'; // dotenv import

import path from 'path'; // path import for resolving file paths
import { fileURLToPath } from 'url';

dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*------ Create Nodemailer Transporter ------*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

/*------ Send Simple Email ------*/
export const sendEmail = async (email, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: email, // Recipient address
            subject, // Subject line
            text, // Plain text content
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

