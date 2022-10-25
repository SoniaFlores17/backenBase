const {Router} = require("express")
const {getUsers, getUserByID, deleteUserByID, ddUser} = require("../controllers/usuarios")
const router = Router()

// http://localhost:4000/api/v1/usuarios?id=

router.get("/", getUsers)
router.get("/id/:id", getUserByID)

router.post("/", ddUser)

router.delete("/", deleteUserByID)

module.exports = router