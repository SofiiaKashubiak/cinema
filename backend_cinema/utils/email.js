const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config.env' });

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    }
});

exports.sendReservePassword = async options => {
    const mailOptions = {
        from: 'Cinema',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transport.sendMail(mailOptions);
};

exports.sendTicket = async options => {
    const mailOptions = {
        from: 'Cinema',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transport.sendMail(mailOptions);
};