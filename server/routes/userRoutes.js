import e from 'express'
import { addDeliveryAddress, checkUser, deleteDeliveryAddress, editDeliveryAddress, getAllAddresses, userDeleteAccount, userLogin, userLogout, userProfile, userProfileUpdate, userSignup } from '../controllers/userControllers.js'
import { userAuth } from '../middlewares/userAuth.js'

const router = e.Router()

router.post('/signup',userSignup)
router.post('/login',userLogin)
router.get('/profile',userAuth,userProfile)
router.put('/logout',userAuth,userLogout)
router.put('/profile-update',userAuth,userProfileUpdate)
router.get('/get-addresses',userAuth,getAllAddresses)
router.post('/add-address',userAuth,addDeliveryAddress)
router.put('/edit-address/:addressId',userAuth,editDeliveryAddress)
router.delete('/delete-address/:addressId',userAuth,deleteDeliveryAddress)
router.delete('/delete-account',userAuth,userDeleteAccount)

router.get('/check-user',userAuth,checkUser)


export {router as userRouter}