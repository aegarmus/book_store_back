import { Usuario } from '../models/Usuario.model.js';
import { hashPassword } from '../services/password/hash.service.js';
import { destructuringUserData, normalizeUserData } from '../utils/normalize/user.js';
import { ensureEmailNotTaken } from '../utils/validators/models.js';
import { validatePassword } from '../utils/validators/password.js';



export const register = async(req, res, next) => {
    try {
        const [ userGeneralData, email, password ] = destructuringUserData(req.body);

        await ensureEmailNotTaken(Usuario, email);
        validatePassword(password, userGeneralData.fecha_nacimiento);

        const hashedPassword = await hashPassword(password);        
        const userData = normalizeUserData(email, hashedPassword, userGeneralData);
        
        /*    const userData = {
            ...userGeneralData,
            email,
            password: hashedPassword
        }; */
        const user = await Usuario.create(userData);
        
        res.status(201).json({
            message: 'Usuario Registrado con éxito',
            status: 201,
            data: user //Solo para fines pedagógicos, no debo mostrar todos los datos del usuario en una respuesta
        });

    } catch (error) {
        next(error);
    }
};