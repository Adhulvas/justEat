import e from 'express'
import { adminAuth } from '../middlewares/adminAuth.js'
import { applyCoupon, createCoupon, getAllCoupons } from '../controllers/couponController.js'
import { userAuth } from '../middlewares/userAuth.js'

const router = e.Router()

router.post('/create-coupon',adminAuth,createCoupon)
router.get('/fetch-coupons',userAuth,getAllCoupons)
router.post('/apply-coupon',userAuth,applyCoupon)


export {router as couponRouter}