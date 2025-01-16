import { config } from '../../config/env.config.js';
import { AuthError } from '../../errors/TypeError.js';

const { frontendUrl } = config;

export const buildResetUrl = (token) => {
    try {
        const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
        return resetUrl;
    } catch (error) {
        throw new AuthError(
            'Error al crear la url para restablecer la contraseña',
            500,
            error
        );
    }
};