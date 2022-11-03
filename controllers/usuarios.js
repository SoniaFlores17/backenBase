const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool=require("../db/connection");

//const { connect } = require("../routes/messager");
const getUsers = async (req=request, res= response)=>{
    
    let conn;
    try{
        conn=await pool.getConnection()

        const users=await conn.query("SELECT * FROM usuarios",(error)=>{throw new Error(error)})

        if(!users){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({users})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()

        }
    }

}


    const getUserByID= async (req=request, res= response)=>{
        const {id}= req.params
        console.log(req.params)
        let conn;

        try{
            conn=await pool.getConnection()
    
            const [user] =await conn.query(`SELECT * FROM usuarios WHERE ID = ${id}`,(error)=>{throw new Error(error)})
    
            if(!user){
                res.status(404).json({msg:`No se encontraron registros con el ID ${id}`})
                return
            }
            res.json({user})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }
    

    const deleteUserByID= async (req=request, res= response)=>{
        const {id}= req.query
        let conn;

        try{
            conn=await pool.getConnection()
    
            const {affectedRews} =await conn.query(`UPDATE Usuarios SET Activo = 'N'  WHERE ID = ${id}`,(error)=>{throw new Error(error)})
            //console.log(userDeleted)
         if(affectedRews === 0){
               res.status(404).json({msg:`No existe  el registros con el ID ${id}`})
              return

            }
            res.json({msg: `El usuario con ID ${id} no se encontro o elimino satisfactoriamente.`})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }


    const ddUser = async (req=request, res= response)=>{
        const{
            Usuario, 
            Nombre,
            Apellidos,
            Edad,
            Genero, 
            Contrasena, 
            Fecha_Nacimiento = '2000-01-01',
            Activo

        }= req.body

        if (
            !Usuario ||
            !Nombre ||
            !Apellidos ||
            !Edad ||
            !Contrasena ||
            !Activo 
        ) {
            res.status(400).json({msg: "Falta información del usuario"})
            return
        }
        let conn;

        try{
            conn=await pool.getConnection()

            const [user] = await conn.query(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuario}'`)

            if (user) {
                res.status(403).json({msg: `El usuario ${Usuario} ya se encuentra registrado.`})
                return
            }

            const salt = bcryptjs.genSaltSync()
            const ContrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)
    
            const {affectedRows} =await conn.query(`
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
                    '${Usuario}',
                    '${Nombre}',
                    '${Apellidos}',
                    '${Edad}',
                    '${Genero || ' '}',
                    '${ContrasenaCifrada}', 
                    '${Fecha_Nacimiento}',
                    '${Activo}'
                )
            `,(error)=>{throw new error})



            //console.log(userDeleted)
         if(affectedRows === 0){
               res.status(404).json({msg:`No se pudo agregar el registro del usuario  ${Usuario}`})
              return

            }
            res.json({msg: `El usuario con ID ${Usuario} se agregó satisfactoriamente.`})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }



    const updateUserByUsuario = async (req=request, res= response)=>{
        const{
            Usuario, 
            Nombre,
            Apellidos,
            Edad,
            Genero, 
            Contrasena, 
            Fecha_Nacimiento = '1900-01-01',
 

        }= req.body

        if (
            !Nombre ||
            !Apellidos ||
            !Edad ||
            !Contrasena 

        ) {
            res.status(400).json({msg: "Falta información del usuario"})
            return
        }
        let conn;

        try{
            conn=await pool.getConnection()

            const [user] = await conn.query(`SELECT Usuario, Nombre, Apellidos, Edad, Genero, Fecha_Nacimiento
             FROM Usuarios WHERE Usuario = '${Usuario}'`)

            if (!user) {
                res.status(403).json({msg: `El usuario ${Usuario} no se encuentra registrado.`})
                return
            }
    
            const {affectedRows} =await conn.query(`
                UPDATE Usuarios SET
                    Nombre ='${Nombre || user.Nombre}',
                    Apellidos = '${Apellidos || user.Apellidos}',
                    Edad = '${Edad || user.Edad}',
                    Genero = '${Genero || user.Genero }', 
                    Fecha_Nacimiento = '${Fecha_Nacimiento}'
                WHERE Usuario = '${Usuario}'
                
            `,(error)=>{throw new error})



            //console.log(userDeleted)
         if(affectedRows === 0){
               res.status(404).json({msg:`No se pudo actualizar el registro del usuario  ${Usuario}`})
              return

            }
            res.json({msg: `El usuario con ID ${Usuario} se actualizó satisfactoriamente.`})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }

    const signIn = async (req=request, res= response)=>{
        const{
            Usuario, 
            Contrasena

        }= req.body

        if (
            !Usuario ||
            !Contrasena 
        ) {
            res.status(400).json({msg: "Falta información del usuario"})
            return
        }
        let conn;

        try{
            conn=await pool.getConnection()

            const [user] = await conn.query(`SELECT Usuario, Contrasena, Activo FROM Usuarios WHERE Usuario = '${Usuario}'`)

            if (!user || user.Activo == 'N') {
                let code = !user ? 1 : 2;
                res.status(403).json({msg: `El usuario o la contraseña son incorrectos.`, errorCode: code})
                return
            }

            const accesoValido = bcryptjs.compareSync(Contrasena, user.Contrasena)

            if (!accesoValido){
                res.status(403).json({msg: `El usuario o la contraseña son incorrectos.`, errorCode:"3"})
                return
            }

            res.json({msg: `El usuario ${Usuario} ha iniciado sesión  satisfactoriamente`})
    
           
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }

    const NuevaContrasena = async (req=request, res= response)=>{
        const{
            Usuario, 
            Contrasena,
            ContrasenaNueva

        }= req.body

        if (
            !Usuario ||
            !Contrasena ||                                                          
            !ContrasenaNueva
        ) {
            res.status(400).json({msg: "Falta información del usuario"})
            return
        }
        let conn;

        try{
            conn=await pool.getConnection()

            const [user] = await conn.query(`SELECT Usuario, Contrasena FROM Usuarios WHERE Usuario = '${Usuario}'`)

            
            if (!user) {
                res.status(403).json({msg: `El usuario '${Usuario}' no se encuentra registrado.`})
                return
            }

            const accesoValido = bcryptjs.compareSync(Contrasena, user.Contrasena)

            if (!accesoValido){
                res.status(403).json({msg: `El usuario o la contraseña son incorrectos.`})
                return
            }

            if (Contrasena===ContrasenaNueva){
                res.status(403).json({msg: ` Ingresa una nueva contraseña segura.`})
                return
            }
             
            const salt =bcryptjs.genSaltSync()
            const ContrasenaCifrada = bcryptjs.hashSync(ContrasenaNueva, salt)
            const {affectedRows} = await conn.query(`UPDATE usuarios SET Contrasena = '${ContrasenaCifrada}'
                                    WHERE  Usuario = '${Usuario}'`, (error)=>{throw new error})

            if (affectedRows===0){
                res.status(404).json({msg: `No se aguardaron los cambios`})
                return
            }

            res.json({msg: `La contraseña se actualizó correctamente`})
    
           
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }
    
 
module.exports = {getUsers, getUserByID, deleteUserByID, ddUser, updateUserByUsuario, signIn, NuevaContrasena}

//Genero ? chalala : nochalala

