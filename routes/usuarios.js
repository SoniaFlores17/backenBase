const {Router} = require("express")
const {getUsers, getUserByID, deleteUserByID, ddUser, updateUserByUsuario, signIn, NuevaContrasena, } = require("../controllers/usuarios")
const router = Router()

// http://localhost:4000/api/v1/usuarios?id=

///GET///
router.get("/", getUsers)
router.get("/id/:id", getUserByID)

///POST///
router.post("/signin", signIn)
router.post("/", ddUser)


///PUT///
router.put("/", updateUserByUsuario)
router.put("/nueva", NuevaContrasena)

///DELETE///
router.delete("/", deleteUserByID)

module.exports = router