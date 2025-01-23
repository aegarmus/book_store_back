export const verifyAdmin = (req, res, next) => {
    try {
        if(!req.user || !req.user.admin) {
            return res.status(403).json({error: 'Acceso denegado: Requieroe permisos de Administrador'});
        }

        next();
    } catch (error) {
        next(error);
    }
};


//Falsys => Datos NO NECESARIAMENTE Booleanos que se pueden considerar falsos (booleanos)

/*
null => Vacio
undefined => No definido
0 => Cero
'' => Cadena vacia
false => Falso
*/

//Thruthy => Datos NO NECESARIAMENTE booleanos que se pueden considerar verdaderos (booleanos)

/*
Todo lo que no es falsy
incluye: {} => Objetos vacios y {} => arreglos vacios
*/


/* 
Negar una negación es verdadero (o falsear una falsedad es verdadero)
Afirmar una falsedad es falso
Afirmar una verdad es verdadero
Negar una verdad es falso
*/