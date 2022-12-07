/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { TransportOptions } from 'nodemailer';

@Injectable()
export class MailService {
    constructor() { }
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_POST,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        }

    } as TransportOptions)


    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активація акаунта на " + process.env.Api_URL,
            text: "",
            html: `
            <div>
            <h1>Для активації акаунта перейдіть по посиланню:</h1>
             <a href="${link}">${link}</a>
             <h2 style="color:blue; font-size:48px">Слава <span style="color:yellow;">Україні!</span></h2>
            </div>`
        })
    }
}