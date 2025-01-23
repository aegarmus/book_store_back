import jwt from 'jsonwebtoken';

import { Usuario } from '../../models/Usuario.model.js';
import { isNotFound } from '../../utils/validators/general.js';
import { isNotMatchedPassword } from '../../utils/validators/password.js';
import { comparePassword } from './hash.service.js';
import { config } from '../../config/env.config.js';
import { normalizeUserPrivateData } from '../../utils/normalize/user.js';
import { AuthError } from '../../errors/TypeError.js';

const { secretKey } = config;

export const loginService = async({ email, password }) => {

    try {
        const user = await Usuario.findOne({ 
            where: { email }, 
            attributes: {
                exclude: ['resetPasswordExpire', 'resetPasswordToken']
            } 
        });
        isNotFound(user);
        const passwordMatch = await comparePassword(password, user.password);
        isNotMatchedPassword(passwordMatch);

        const privateUser = normalizeUserPrivateData(user);
        const token = jwt.sign(
            { id: user.id, email: user.email, admin: user.admin }, 
            secretKey,
            { expiresIn: '1h' }
        );

        return {
            token,
            user: privateUser
        };
    } catch (error) {
        throw new AuthError('Login no autorizado', 500, error); 
    }
};