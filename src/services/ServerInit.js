import { config } from '../config/env.config.js';
import { dbConnect } from './dbConnection.js';

const { port } = config;

export const serverInit = async(app) => {
    try {
        console.log('Verificando Conexión a la Base de Datos');
        await dbConnect();
        app.listen(port, () => {
            console.log(`Servidor iniciado en el puerto ${port}`);
        });
    } catch (error) {
        console.error('Error al inicializar el servidor', error);
    }
};