/* eslint-disable */
import nodemailer from "nodemailer";
import { appSettings } from "../config/index.js";

export async function sendEmail(options: { to: string[]; subject: string; html: string }) {
    let transporter = nodemailer.createTransport({
        host: appSettings.MAILER.HOST,
        port: appSettings.MAILER.PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: appSettings.MAILER.AUTH.USER,
            pass: appSettings.MAILER.AUTH.PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"ts fullstack template',
        to: options.to, // list of receivers
        subject: options.subject,
        html: options.html,
    });

    console.log(`Message sent: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
