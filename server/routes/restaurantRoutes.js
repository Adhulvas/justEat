import e from 'express'
import { getAllRestaurants, getRestaurantDetailsWithFoodItems, getRestaurantsByCategory, restaurantLogin, restaurantSignup } from '../controllers/restaurantController.js'
import { userAuth } from '../middlewares/userAuth.js'

const router = e.Router()

router.post('/signup',restaurantSignup)
router.post('/login',restaurantLogin)
router.get('/restaurants',getAllRestaurants)
router.get('/:categoryId',getRestaurantsByCategory)
router.get('/detailed-view/:restaurantId',userAuth,getRestaurantDetailsWithFoodItems)
router.put('/profile-update')
router.delete('/delete-account')

router.get('/check-user')


export {router as restaurantRouter}