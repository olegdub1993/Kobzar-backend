export declare class MailService {
    constructor();
    private transporter;
    sendActivationMail(to: any, link: any, subject: any, message: any): Promise<void>;
}
