import { config } from '../../config/env.config.js';
import { transporter } from '../../config/mail.config.js';
import { MailServiceError } from '../../errors/TypeError.js';

const { user } = config.mail.auth;

export const sendMailService = async({ to, subject, message, html = '' }) => {
    try {
        const mailOptions = {
            from: user,
            to,
            subject,
            message,
            html
        };

        const infoData = await transporter.sendMail(mailOptions);
        console.log('Correo enviado con éxito');
        return infoData;
    } catch (error) {
        throw new MailServiceError('Error al enviar el correo', 500, error);
    }
};