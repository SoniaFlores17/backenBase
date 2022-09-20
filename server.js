const express = require('express')
const messagesRouter = require('./routes/messages')

class Server {
    constructor(){
        this.app = express()
        this.paths = {
            messages: "/api/v1/messages"
        }
        this.routes()
    }

    routes() {
        //this.app.get('/', (req, res) => {
        // res.send('Hello Word')
        //  }) //end point
      this.app.use(this.paths.messages, messagesRouter)
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Backend en ejecución",process.env.PORT)
        })  
    }
}

module.exports = Server 