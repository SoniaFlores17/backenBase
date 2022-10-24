const { request, response } = require("express");
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
module.exports = {getUsers, getUserByID, deleteUserByID}