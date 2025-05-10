import e from 'express'
import { userAuth } from '../middlewares/userAuth.js';
import { addToCart, getCartItems, removeFromCart, updateCartItemQuantity } from '../controllers/cartController.js';

const router = e.Router();

router.post('/add',userAuth,addToCart)
router.delete('/remove/:foodItemId',userAuth,removeFromCart)
router.patch('/update-quantity',userAuth,updateCartItemQuantity)
router.get('/getCart',userAuth,getCartItems)

export {router as cartRouter}