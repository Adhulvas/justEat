import e from 'express'
import { restaurantAuth } from '../middlewares/restaurantAuth.js';
import { upload } from '../utils/multer.js';
import { addCategory, addFoodItem, deleteCategory, deleteFoodItem, editFoodItem, getAllCategories, searchFoodAndRestaurant } from '../controllers/foodController.js';
import { adminAuth } from '../middlewares/adminAuth.js';

const router = e.Router();

router.post('/add',restaurantAuth,upload.single('image'),addFoodItem)
router.put('/edit/:id',restaurantAuth,upload.single('image'),editFoodItem)
router.put('/delete/:foodItemId',restaurantAuth,deleteFoodItem)
router.post('/add-category',adminAuth,upload.single('image'),addCategory)
router.delete('/delete-category/:categoryId',adminAuth,deleteCategory)
router.get('/all-categories',getAllCategories)
router.get('/search',searchFoodAndRestaurant)

export {router as foodItemRouter}