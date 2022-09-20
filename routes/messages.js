const {Router} = require ("express")
const router = Router()

router.get("/", (req, res) =>{res.send("Hola!")}) //end point

module.exports = router