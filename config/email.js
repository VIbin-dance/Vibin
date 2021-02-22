const transporter = require("./transport").transporter;

const sendMail = (to, subject, html) => {
    const message = {
        from: process.env.EMAIL,
        to: `${to}`,
        subject: `${subject}`,
        html: `${html}`,
    };

    transporter.sendMail(message, async(err, response) => {
        console.log(err || response);
    });
};

module.exports = { sendMail };