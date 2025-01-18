import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY || 'defaultSecretKey',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5050',
    domain: process.env.DOMAIN || 'http://localhost:3000',
    db: {
        name: process.env.DB_NAME || 'database',
        user: process.env.DB_USER || 'user',
        pass: process.env.DB_PASS || 'pass',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || 'postgres'
    },
    mail: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.MAIL_PORT )|| 587,
        secure: process.env.MAIL_SECURE === 'true' ? true : false,
        auth: {
            user: process.env.MAIL_USER || 'your-email@gmail.com',
            pass: process.env.MAIL_PASS || 'your-password'
        }
    },
    /*    validTypesFiles: {
        images: ['jpg', 'webp', 'png'],
        videos: ['mp4', 'webm', 'ogg'],
        documents: ['pdf', 'docx', 'doc', 'xls', 'xlsx', 'ppt']
    } */
};