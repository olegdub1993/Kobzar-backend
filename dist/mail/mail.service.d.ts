export declare class MailService {
    constructor();
    private transporter;
    sendActivationMail(to: any, link: any): Promise<void>;
}
