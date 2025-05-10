import e from 'express'
import { userRouter } from './userRoutes.js'
import { restaurantRouter } from './restaurantRoutes.js'
import { foodItemRouter } from './foodItemRoutes.js'
import { adminRouter } from './adminRoutes.js'
import { cartRouter } from './cartRoutes.js'
import { couponRouter } from './couponRoutes.js'

const router = e.Router()

router.use('/user',userRouter)
router.use('/restaurant',restaurantRouter)
router.use('/admin',adminRouter)
router.use('/foodItem',foodItemRouter)
router.use('/cart',cartRouter)
router.use('/coupon',couponRouter)

export { router as apiRouter}