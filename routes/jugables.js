const {Router} = require("express")
const {getJugables, getJugablesByID, deleteJugablesByID, addJugables, updateJugables} = require("../controllers/jugables")
const router = Router()

// http://localhost:4000/api/v1/usuarios?id=

///GET///
router.get("/", getJugables)
router.get("/id/:id", getJugablesByID)

///POST///
router.post("/", addJugables)


///PUT///
router.put("/", updateJugables)
//router.put("/nueva", NuevaContrasena)

///DELETE///
router.delete("/", deleteJugablesByID)

module.exports = router