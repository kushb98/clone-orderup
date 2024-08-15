import nodemailer from 'nodemailer';
import env from './validateEnv';

// Function to send email
export const sendEmail = async (to: string, subject: string, text: string) => {
  
    // Create a transporter using Mailtrap settings
  const transporter = nodemailer.createTransport({
    host: env.MAILTRAP_HOST,
    port: env.MAILTRAP_PORT,
    auth: {
      user: env.MAILTRAP_USER,
      pass: env.MAILTRAP_PASS,
    },
  });

  // Set up email options
  const mailOptions = {
    from: 'no-reply@yourapp.com',
    to,
    subject,
    text,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
