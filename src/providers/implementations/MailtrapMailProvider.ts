import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
export class MailtrapMailProvider implements IMailProvider {

    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "9a11f559b9df7d",
                pass: "bf84cbfced824f"
            }
        });
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body,
        })
    }
}