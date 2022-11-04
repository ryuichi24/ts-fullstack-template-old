import { exit } from "process";
import * as fs from "fs";
import nodemailer from "nodemailer";

nodemailer
    .createTestAccount()
    .then((testAccount) => {
        fs.writeFileSync("nodemailer-test-account.json", JSON.stringify(testAccount), "utf-8");
    })
    .catch((err) => {
        console.error(err);
        exit(1);
    });
