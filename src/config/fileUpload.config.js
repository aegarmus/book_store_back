import fileUpload from 'express-fileupload';

export const fileUploadConfig = fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, //10MB,
    abortOnLimit: true,
});