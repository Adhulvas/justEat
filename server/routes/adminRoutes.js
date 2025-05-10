import e from 'express'
import { adminLogin, adminSignup } from '../controllers/adminController.js'

const router = e.Router()

router.post('/signup',adminSignup)
router.post('/login',adminLogin)


export {router as adminRouter}