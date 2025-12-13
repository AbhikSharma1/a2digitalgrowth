const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send email function
const sendEmail = async (to, subject, text, html = null) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"A3 Digital Growth" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html: html || `<pre>${text}</pre>`
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
};

// Send HTML email template
const sendHTMLEmail = async (to, subject, htmlContent) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"A3 Digital Growth" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: htmlContent
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('HTML Email sent successfully:', result.messageId);
        return result;
    } catch (error) {
        console.error('HTML Email sending failed:', error);
        throw error;
    }
};

module.exports = {
    sendEmail,
    sendHTMLEmail
};