import { AuthError } from '../../errors/TypeError.js';
import { Usuario } from '../../models/Usuario.model.js';
import { isNotFound } from '../../utils/validators/general.js';
import { isNotMatchedPassword } from '../../utils/validators/password.js';
import { comparePassword, hashPassword } from './hash.service.js';

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