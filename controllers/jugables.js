const { request, response } = require("express");
const pool=require("../db/connection");
const modeloJugables = require("../models/jugables");

//const { connect } = require("../routes/messager");
const getJugables = async (req=request, res= response)=>{
    
    let conn;
    try{
        conn=await pool.getConnection()

        const jugables =await conn.query(modeloJugables.queryGetJugables, (error)=>{throw new Error(error)})

        if(!jugables){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({jugables})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()

        }
    }

}


    const getJugablesByID= async (req=request, res= response)=>{
        const {id}= req.params
        let conn;

        try{
            conn=await pool.getConnection()
    
            const [jugables] =await conn.query(modeloJugables.queryGetJugablesByID,[id],(error)=>{throw new Error(error)})
    
            if(!jugables){
                res.status(404).json({msg:`No se encontraron registros con el ID ${id}`})
                return
            }
            res.json({jugables})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }
1    

    const deleteJugablesByID= async (req=request, res= response)=>{
        const {id}= req.query
        let conn;

        try{
            conn=await pool.getConnection()
    
            const {affectedRews} =await conn.query(modeloJugables.queryDeleteJugablesByID,[id],(error)=>{throw new Error(error)})
            //console.log(userDeleted)
         if(affectedRews === 0){
               res.status(404).json({msg:`No existe  el registros con el ID ${id}`})
              return

            }
            res.json({msg: `El personaje con ID ${id} elimino satisfactoriamente.`})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }


    const addJugables = async (req=request, res= response)=>{
        const{
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

        }= req.body

        if (
            !Nombre||
            !Elementos||
            !Arma||
            !Rareza||
            !Region||
            !Habilidades_Pasivas||
            !Rol_equipo||
            !Constelacion||
            !Ataque||
            !Activo 
        ) {
            res.status(400).json({msg: "Falta información del personaje"})
            return
        }
        let conn;

        try{
            conn=await pool.getConnection()

            const [jugables] = await conn.query(modeloJugables.queryJugablesExists,[Nombre])

            if (jugables) {
                res.status(403).json({msg: `El personaje ${Nombre} ya se encuentra registrado.`})
                return
            }

            
    
            const {affectedRows} =await conn.query(modeloJugables.queryAddJugables, [ 
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
                ], (error)=>{throw new error})



            //console.log(userDeleted)
         if(affectedRows === 0){
               res.status(404).json({msg:`No se pudo agregar el registro del personaje  ${Nombre}`})
              return

            }
            res.json({msg: `El personaje con ID ${Nombre} se agregó satisfactoriamente.`})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }



    const updateJugables = async (req=request, res= response)=>{
        const{
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
        }= req.body

        if (
            !Nombre 

        ) {
            res.status(400).json({msg: "Falta información del jugable"})
            return
        }
        let conn;

        try{
            conn=await pool.getConnection()

            const [jugables] = await conn.query(modeloJugables.queryGetJugablesInfo, [Nombre])

            if (!jugables) {
                res.status(403).json({msg: `El jugable ${Nombre} no se encuentra registrado.`})
                return
            }
    
            const {affectedRows} =await conn.query(modeloJugables.queryUpdateByNombre,[
                Elementos || jugables.Elementos,
                Arma || jugables.Arma,
                Rareza || jugables.Rareza,
                Region || jugables.Region,
                Habilidades_Pasivas||jugables.Habilidades_Pasivas,  
                Rol_equipo || jugables.Rol_equipo,
                Constelacion||jugables.Constelacion,
                Ataque||jugables.Ataque,
                Activo||jugables.Activo,
                Nombre
            ],(error)=>{throw new error})
            //console.log(userDeleted)
         if(affectedRows === 0){
               res.status(404).json({msg:`No se pudo actualizar el registro del jugable  ${Nombre}`})
              return

            }
            res.json({msg: `El jugable ${Nombre} se actualizó satisfactoriamente.`})
        }catch(error){
            console.log(error)
            res.status(500).json({error})
        }finally{
            if(conn){
                conn.end()
    
            }
        }
    
    }

    
    
 
module.exports = {getJugables, getJugablesByID, deleteJugablesByID, addJugables, updateJugables}

//Genero ? chalala : nochalala

