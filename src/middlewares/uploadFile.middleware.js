import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { UploadFileError } from '../errors/TypeError.js';
import { config } from '../config/env.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { domain } = config;


export const uploadFileMiddleware = (folderName, fileKey = 'files', /* type */) => {
    return(req, res, next) => {
        try {
            if(!req.files || !req.files[fileKey]) {
                return next();
            }
            const file = req.files[fileKey];
    
            const extension = path.extname(file.name);
            //isValidExtension(extension, type);
            //validTypesFiles[type].includes(extension)
            const safeName = req.body.nombre.replace(/\s+/g, '-');
    
            const uniqueNameFile = `${uuidv4()}-${safeName}${extension}`;
            //C:/djkjfdkdfjfjd/book_store_back/public/uploads/images/books/uuid-nombreLibro.ext
            const uploadPath = path.join(__dirname, `../../public/uploads/${folderName}`, uniqueNameFile);
    
            file.mv(uploadPath, (err) => {
                if(err) {
                    console.error('Error Subiendo archivo', err);
                    throw new UploadFileError('Error al intentar subir el archivo', 500, err);
                }
                
                req.uploadedFilePath = `${domain}/uploads/${folderName}/${uniqueNameFile}`;
                next();
            });
            
        } catch (error) {
            console.error(error);
            throw new UploadFileError('Error al subir el archivo', 500, error);
        }
    };
}; 