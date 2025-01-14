

/**
 * Normaliza la estuctura de datos de una petición con datos de usuario para poder procesarlos y validarlos adecuadamente
 * @param {Object} data - Datos que llegan desde la petición con la información del usuario a destructurar 
 * @returns {Array} - Array con 3 elementos, los datos generales del usuario como objeto, el email en la segunda posición y la contraseña en la ultima
 */
export const destructuringUserData = (data) => {
    const {
        nombre,
        apellido_paterno,
        apellido_materno,
        email,
        telefono,
        password,
        fecha_nacimiento,
        admin
    } = data;

    const globalDataUser = {
        nombre,
        apellido_paterno,
        apellido_materno,
        telefono,
        fecha_nacimiento,
        admin
    };

    return [globalDataUser, email, password];
};


export const normalizeUserData = (email, password, generalData = {}) => {
    return {
        email, 
        password,
        ...generalData
    };
};


export const normalizeUserPrivateData = (user) => {
    const { id, nombre, apellido_paterno, apellido_materno, email } = user;

    return {
        id,
        nombre,
        apellido_paterno,
        apellido_materno,
        email
    };
};