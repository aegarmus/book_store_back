import { Usuario } from '../../models/Usuario.model.js';

export const loginService = async(wmail, password) => {
    try {
        const user = await Usuario.findOne({ email });

        
    } catch (error) {
        
    }
};