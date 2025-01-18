import { CustomError } from './CustomError.js';


export class ValidateError extends CustomError {
    constructor(message, statusCode, details) {
        super(  message || 'Error de Validación', statusCode || 400, details);
    }
}

export class NotFound extends CustomError {
    constructor(message, details, entity) {
        super(message || `${entity} No encontrado`, 404, details);
    }
}

export class DataBaseError extends CustomError {
    constructor(message, statusCode, details) {
        super(
            message || 'Error en la comunicación con la Base de Datos',
            statusCode || 500,
            details
        );
    }
}

export class AuthError extends CustomError {
    constructor(message, statusCode, details) {
        super(
            message || 'Error en el proceso de autenticación',
            statusCode || 500,
            details
        );
    }
}


export class MailServiceError extends CustomError {
    constructor(message, statusCode, details) {
        super(
            message || 'Error en el servicio de mensajería por correo',
            statusCode || 500,
            details
        );
    }
}

export class UploadFileError extends CustomError {
    constructor(message, statusCode, details) {
        super(
            message || 'Error al subir el archivo al servidor',
            statusCode || 500,
            details
        );
    }
}
 
export class InternalServerError extends CustomError {
    constructor(message, statusCode, details) {
        super(message || 'Error interno del Servidor', statusCode || 500, details);
    }
}