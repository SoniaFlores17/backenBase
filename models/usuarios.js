const modeloUsuarios = {
    queryGetUsers:"SELECT * FROM usuarios",
    queryGetUserByID: `SELECT * FROM usuarios WHERE ID = ?`,
    queryDeleteUserByID: `UPDATE usuarios SET Activo='N' WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM usuarios WHERE Usuario = ?`,
    queryAddUser: `
    INSERT INTO usuarios (
        Usuario,
        Nombre,
        Apellidos,
        Edad,
        Genero,
        Contrasena,
        Fecha_Nacimiento,
        Activo
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `,
    queryGetUserInfo: `
    SELECT Usuario, Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento 
    FROM usuarios 
    WHERE Usuario = ?
    `,
    queryUpdateByUsuario: `
    UPDATE usuarios SET
        Nombre = ?,
        Apellidos = ?,
        Edad = ?,
        Genero = ?,
        Fecha_Nacimiento = ?
    WHERE Usuario = ?
    `,
    querySignIn: `SELECT Usuario, Contrasena, Activo FROM usuarios WHERE Usuario = ?`,
    queryUpdatePassword: `
    UPDATE usuarios SET
        Contrasena = ?
    WHERE Usuario = ?
    ` 
}

const updateUsuario = (
    Nombre,
    Apellidos,
    Edad,
    Genero,
    Fecha_Nacimiento,
    Usuario
) => {
    return `
        UPDATE usuarios SET
            Nombre = '${Nombre}',
            Apellidos = '${Apellidos}',
            Edad = ${Edad},
            ${Genero  ? `Genero = '${Genero}',`: ''}
            Fecha_Nacimiento = '${Fecha_Nacimiento}'
        WHERE Usuario = '${Usuario}'
    `
}

module.exports = {modeloUsuarios, updateUsuario}