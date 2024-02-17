const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();

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
    { link: "https://cardstore-api.onrender.com/auth", name: "CardStore Backend" },
]

const webhookHandler = async (req, res) => {
    try {
        const result = [];

        for (let site of sitesToTest) {
            const timeStarted = Date.now();
            const siteTestResult = { name: site.name };
            try {
                await axios.get(site.link);
                siteTestResult.passed = true;
            } catch (error) {
                siteTestResult.passed = false;
            }
            siteTestResult.time = `${(Date.now() - timeStarted) / 1000} sec`;
            result.push(siteTestResult)
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

        console.log(result);

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

        return res.status(204).json();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

app.get("/hooking", webhookHandler);

const runServer = (port = 4000) => {
    app.listen(port, () => {
        console.log("Server running on port %s", port);
    })
};

runServer(process.env.PORT);