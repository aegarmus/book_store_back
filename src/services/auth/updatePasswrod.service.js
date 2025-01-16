import crypto from 'crypto';
import { AuthError } from '../../errors/TypeError.js';
import { Usuario } from '../../models/Usuario.model.js';
import { isNotFound } from '../../utils/validators/general.js';
import { isNotMatchedPassword } from '../../utils/validators/password.js';
import { comparePassword, hashPassword } from './hash.service.js';
import { buildResetUrl } from '../../utils/normalize/buildReset.js';
import { sendMailService } from '../mails/sendMail.service.js';

export const updateUserPasswordWithPassword = async(id, { oldPassword, newPassword }) => {
    try {
        const user = await Usuario.findOne({ 
            where: { id }, 
            attributes: ['password', 'id']
        });
        isNotFound(user);

        const matchPassword = await comparePassword(oldPassword, user.password);
        isNotMatchedPassword(matchPassword);

        user.password = await hashPassword(newPassword);
        await user.save();

        return user;
    } catch (error) {
        throw new AuthError('No pudimos actualizar tu contraseña', 498, error);
    }
};


export const forgotPasswordService = async({ email }) => {
    try {
        console.log(email);
        const user = await Usuario.findOne({ where: { email }});
        console.log(user);

        const token = crypto.randomBytes(20).toString('hex'); //Token Aleatorio
        const expiresIn = Date.now() + 300000; //5minutos desde el presente

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expiresIn;

        await user.save();

        const resetUrl = buildResetUrl(token);

        await sendMailService({
            to: user.email,
            subject: 'Recuperar contraseña',
            message: 'Visita el siguiente enlace para restablcer tu contraseña',
            html: `<p>Haz click en el siguiente enlace para restablecer tu contraseña</p>
                    <a href="${resetUrl}">Restablecer Contraseña Aquí</a>`
        });

        return 'Email de restablecimiento enviado';

    } catch (error) {
        throw new AuthError(
            'Error al enviar el correo de restablicimiento de contraseña', 
            500, 
            error
        );
    }
};


