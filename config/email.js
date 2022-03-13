const transporter = require("./transport").transporter;
// const fs = require('fs')
const ejs = require('ejs')
const path = require('path');


const sendMail = (to, subject, html) => {
    // const text = ejs.renderFile(`../public/email/${file}`, { lesson: data });
    // console.log(text);
    // fs.readFile(`public/email/${file}`, "utf-8", (err, file) => {
    //     console.log(err || file);
    // })

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