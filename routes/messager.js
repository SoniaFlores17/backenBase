const {Router} = require ("express")
const router = Router()
const{rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage} = require ('../controllers/messages')

router.get('/', rootMessage) //end point
//router.get('/hi', hiMessage) //end point
router.get('/hi/:aname', hiMessage)
router.get('/bye', byeMessage)//end point

router.post('/', postMessage)
router.put('/', putMessage)
router.delete('/', deleteMessage)



module.exports = router