import crypto from 'crypto';
import { Op } from 'sequelize';

import { AuthError } from '../../errors/TypeError.js';
import { Usuario } from '../../models/Usuario.model.js';
import { isNotFound } from '../../utils/validators/general.js';
import { isEqualPassword, isNotMatchedPassword, validatePassword } from '../../utils/validators/password.js';
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

        const user = await Usuario.findOne({ where: { email }});
     

        const token = crypto.randomBytes(20).toString('hex'); //Token Aleatorio
        const expiresIn = Date.now() + 300000; //5minutos desde el presente

        user.resetPasswordToken = token;
        user.resetPasswordExpire = expiresIn;

        await user.save();

        const resetUrl = buildResetUrl(token);

        await sendMailService({
            to: user.email,
            subject: 'Recuperar contraseña',
            message: 'Visita el siguiente enlace para restablcer tu contraseña',
            html: `<p>Haz click en el siguiente enlace para restablecer tu contraseña</p>
                    <a href="${resetUrl}">Restablecer Contraseña Aquí</a>`
        });

        return user;

    } catch (error) {
        throw new AuthError(
            'Error al enviar el correo de restablicimiento de contraseña', 
            500, 
            error
        );
    }
};


export const resetPasswordService = async(token, newPassword) => {
    try {
        const user = await Usuario.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpire: { [Op.gt]: Date.now()}
            }
        });
        console.log(user);

        isNotFound(user);
        validatePassword(newPassword, user.fecha_nacimiento);
        await isEqualPassword(newPassword, user.password);

        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return 'Contraseña reestablecida con éxito';
    } catch (error) {
        console.error(error);
        throw new AuthError('Error al restablecer la contraseña', 500, error);
    }
};

