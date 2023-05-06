const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, //ssl
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})


async function sendEmail(userData, confirmationLink) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: userData.email,
        subject: "Please confirm your email address",
        html: `
        <h2>Dear ${userData.username},</h2>

        <p>Thank you for signing up for our service! We're excited to have you on board.</p>
        
        <p>Before we can start sending you updates and notifications, we need to confirm your email address. Please click on the link below to verify your email address:</p>
        
        <a href="${confirmationLink}">Confirm your email</a>
        

        <p>If you didn't sign up for our service, you can simply ignore this email.</p>
        
        <p>Thank you for your cooperation. If you have any questions, feel free to reply to this email.</p>
        
        <p>Best regards,</p>
        <p>Ghiles Larbi / jskabyle</p>
        `,
    }
    
    try {
        const mail = await transport.sendMail(mailOptions)
        return true
    } catch (err) {
        return false
    }
}

module.exports = sendEmail