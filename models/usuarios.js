const { NuevaContrasena } = require("../controllers/jugables");

const modeloUsuarios = {
    queryGetUsers: "SELECT * FROM Usuarios",
    queryGetUserByID: `SELECT * FROM Usuarios WHERE ID = ?`,
    queryDeleteUserByID: `UPDATE Usuarios SET Activo = 'N'  WHERE ID = ?`,
    queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = '?'`,
    queryAddUser: `
    INSERT INTO usuarios(
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
            ?,
        )`,
    queryGetuserInfo:
    `SELECT Usuario, Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento
             FROM Usuarios WHERE Usuario = '?'`,
    queryUpdateByUsuario:`
                UPDATE Usuarios SET
                    Nombre ='?',
                    Apellidos = '?',
                    Edad = '?',
                    Genero = '?', 
                    Fecha_Nacimiento = '?'
                WHERE Usuario = '?' `,
    querySignin: `SELECT Usuario, Contrasena, Activo FROM Usuarios WHERE Usuario = '?`,
    NuevaContrasena: `
    UPDATE usuarios SET
        Contrasena = ?
        WHERE Usuario = ?
        `
}

module.exports = modeloUsuarios