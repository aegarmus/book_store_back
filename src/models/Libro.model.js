import { DataTypes, Model } from 'sequelize';


export class Libro extends Model {}

export const initLibro = (dbConfig) => {
    Libro.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'El nombre no puede ser un campo vacío' },
                    len: {
                        args: [2, 100],
                        msg: 'El nombre no puede ser menor a 2 ni mayor a 100 carácteres',
                    },
                },
            },
            autor: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: 'El apellido no puede ser un campo vacío' },
                    len: {
                        args: [2, 100],
                        msg: 'El apellido paterno debe tener entre 2 y 50 carácteres',
                    },
                    is: {
                        args: /^[a-zA-ZÁ-ÿñÑ\s]+$/,
                        msg: 'El nombre solo puede contener letras del abecedario español',
                    },
                },
            },
            descripcion: {
                type: DataTypes.TEXT,
                validate: {
                    len: {
                        args: [2, 500],
                        msg: 'El apellido materno debe tener entre 2 y 50 carácteres',
                    },
                },
            },
            editorial: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            genero: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha_publicacion: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            edicion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            paginas: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            precio: {
                type: DataTypes.INTEGER,
                //Validar que no sea 0
            },
            cantidad: {
                type: DataTypes.INTEGER,
                //validar que no sea menor a 0
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize: dbConfig,
            modelName: 'Libro',
            tableName: 'libros',
            timestamps: true,
            paranoid: true, //Habilito el soft Delete al usar Destroy - Pero, agrega un campo nuevo llamado deletedAt
        }
    );
};
