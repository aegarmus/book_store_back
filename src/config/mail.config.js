import nodemailer from 'nodemailer';
import { config } from './env.config.js';
import { MailServiceError } from '../errors/TypeError.js';

const mailConfig = config.mail;

export const transporter = nodemailer.createTransport(mailConfig);

export const verifyConnectionMail = async() => {
    try {
        await transporter.verify();
        console.log('Conexión éxitosa con el servidor de correo electronico');
    } catch (error) {
        console.error(error);
        throw new MailServiceError('Error al conectar con el servidor de correo', 500, error);
    }
};