import { registerService } from '../services/auth/registerService';
import { Usuario } from '../models/Usuario.model.js';

export const register = async(req, res, next) => {
    try {
        const user = await registerService(req.body, Usuario);
        
        res.status(201).json({
            message: 'Usuario Registrado con éxito',
            status: 201,
            data: user //Solo para fines pedagógicos, no debo mostrar todos los datos del usuario en una respuesta
        });

    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
};