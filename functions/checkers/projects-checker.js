const axios = require("axios");
const nodemailer = require("nodemailer");
const app = require("express")();

const createOptions = ({ subject, name, email, text }) => ({
    from: 'nnannaezema@outlook.com',
    to: 'emmanuelezema6@gmail.com',
    subject: `${subject} (${name})`,
    text: `From: ${name} - ${email}\n Message: ${text}`,
    html: `
            <html>
                <head>
                    <style>
                        h1 { font-weight: normal; }
                        h1 span { font-weight: bold; }
                        p { color: #151515; }
                    </style>
                </head>
                <h1>Message from <span>${text}</span> - <span>${email}</span></h1>
                <p>${text}<p>
            </html>
        `
});

const sitesToTest = [
    { link: "https://cardstore-api.onrender.com/api/auth", name: "CardStore Backend" },
]

exports.handler = async (req, res) => {
    try {
        const result = [];

        for (let site of sitesToTest) {
            try {
                console.log("Checking %", site.name);
                const timeStarted = Date.now();
                await axios.get(site.link);
                const timeEnded = Date.now();
                const timeElapsed = timeEnded - timeStarted;
                const timeInSeconds = Math.ceil(timeElapsed / 1000);
                result.push({ name: site.name, passed: true });
            } catch (error) {
                console.log("Check failed");
                result.push({ name: site.name, passed: false });
            }
        };

        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const subject = "Site Tests Result";
        const senderName = "nCheck Site Tester";
        const email = "emmanuelezema6@gmail.com";
        const text = result
            .map(site => `<p>${site.name} test result: ${site.passed ? "Passed" : "Failed"}</p>`)
            .join("<br />");
        const options = createOptions({ subject, text, email, name: senderName });

        const sendMail = () => new Promise(
            (resolve, reject) => {
                transporter.sendMail(options, (error, info) => {
                    if (error) reject(error)
                    else {
                        console.log(info.response);
                        resolve();
                    }
                })
            }
        );

        await sendMail();

        return {
            statusCode: 204
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500
        }
    }
};