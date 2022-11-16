const modeloJugables = {
    queryGetJugables: `SELECT * FROM jugables`,
    queryGetJugablesByID: `SELECT * FROM jugables WHERE ID = ?`,
    queryDeleteJugablesByID: `UPDATE jugables SET Activo = 'N'  WHERE ID = ?`,
    queryJugablesExists: `SELECT Nombre FROM jugables WHERE Nombre = ?`,
    queryAddJugables: `
    INSERT INTO jugables(
            Nombre, 
            Elementos,
            Arma,
            Rareza,
            Region, 
            Habilidades_Pasivas, 
            Rol_equipo,
            Constelacion,
            Ataque,
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
            ?,
            ?
        )`,
    queryGetJugablesInfo:
    `SELECT Nombre, Elementos, Arma, Rareza, Region, Habilidades_Pasivas, Rol_equipo, Constelacion, Ataque, Activo FROM jugables WHERE Nombre= ?`,
    queryUpdateByNombre:`
                UPDATE jugables SET
                    Elementos = ?,
                    Arma = ?,
                    Rareza = ?,
                    Region = ?, 
                    Habilidades_Pasivas = ?, 
                    Rol_equipo = ?,
                    Constelacion = ?,
                    Ataque = ?,
                    Activo = ?
                WHERE Nombre = ? `
}

module.exports = modeloJugables
