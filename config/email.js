const transporter = require("./email");

const sendMail = (to, subject, text) => {
    const message = {
        from: process.env.EMAIL,
        to: `${to}`,
        subject: `${subject}`,
        html: `${text}`,
    };

    transporter.sendMail(message, async (err, response) => {
        console.log(err || response);
    });
};

module.exports = { sendMail };