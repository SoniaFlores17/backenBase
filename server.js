const express = require('express')
const messagesRouter = require('./routes/messager')
const usuariosRouter = require('./routes/usuarios')
const jugablesRouter = require('./routes/jugables')
const cors = require("cors")

class Server {
    constructor(){
        this.app = express()
        this.paths  = {
            messages: "/api/v1/messages",
            usuarios: "/api/v1/usuarios",
            jugables: "/api/v1/jugables"
        }
        this.middlerwares()
        this.routes()
        
    }

    routes() {
        //this.app.get('/', (req, res) => {
        // res.send('Hello Word')
        //  }) //end point
      this.app.use(this.paths.messages, messagesRouter)
      this.app.use(this.paths.usuarios, usuariosRouter)
      this.app.use(this.paths.jugables, jugablesRouter)
    }

    middlerwares(){
        this.app.use(cors())  //Permite solicitudes de origen cruzado
        this.app.use(express.json()) // habilita la lectura de contenido en forma JSON
    }



    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Backend en ejecución",process.env.PORT)
        })  
    }
}

module.exports = Server 