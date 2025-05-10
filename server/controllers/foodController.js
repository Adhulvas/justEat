import Category from '../models/category.js';
import FoodItem from '../models/foodItem.js';
import Restaurant from '../models/restaurant.js';
import { cloudinaryInstance } from '../config/cloudinary.js';

export const addFoodItem = async (req, res) => {
  try {
    const { name, description, price, type, category, isAvailable } = req.body;

    if (!name || !price || !type || !category) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const categoryExists = await Category.findById(category);
    
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const restaurantId = req.restaurant.id;

    const existingItem = await FoodItem.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      restaurant: restaurantId
    });

    if (existingItem) {
      return res.status(400).json({ message: 'Food item with this name already exists for this restaurant' });
    }

    // console.log(req.file,'=========req.file')

    const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path)).url;
    // console.log(imageUrl,'=========imageUrl')

    const foodItem = new FoodItem({
      name,
      description,
      price,
      category,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      type,
      image: imageUrl,
      restaurant: restaurantId,
    });

    await foodItem.save();

    res.status(201).json({ message: 'Food item added successfully', foodItem  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const editFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, type, category, isAvailable } = req.body;

    const foodItem = await FoodItem.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Ensure the food item belongs to the logged-in restaurant
    if (foodItem.restaurant.toString() !== req.restaurant.id) {
      return res.status(403).json({ message: 'Unauthorized to edit this food item' });
    }

    // Validate category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
      foodItem.category = category;
    }

    // Upload new image if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'justeat/foodItems',
      });
      foodItem.image = result.secure_url;
    }

    // Update fields if provided
    if (name) foodItem.name = name;
    if (description) foodItem.description = description;
    if (price) foodItem.price = price;
    if (type) foodItem.type = type;
    if (isAvailable !== undefined) foodItem.isAvailable = isAvailable;

    await foodItem.save();

    res.status(200).json({ message: 'Food item updated successfully', foodItem });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addCategory = async (req,res)=> {
  try {
    const { name } = req.body;

    if(!name){
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    // let imageUrl = '';

    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: 'justeat/categories',
    //   });
    //   imageUrl = result.secure_url;
    // }

    const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path)).url;

    const newCategory = new Category({
      name,
      image: imageUrl,
    });

    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully', category: newCategory });

  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
}


export const deleteCategory = async (req, res) => {
  try {
    const {categoryId} = req.params

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};


export const getAllCategories = async (req,res)=>{
  try {
    const categories = await Category.find()
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch categories' });
  }
}


export const deleteFoodItem = async (req, res) => {
  try {
    const { foodItemId } = req.params;

    const foodItem = await FoodItem.findById(foodItemId);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Optional: Ensure only the owner restaurant can delete
    if (foodItem.restaurant.toString() !== req.restaurant.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this food item' });
    }

    await foodItem.deleteOne();

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const searchFoodAndRestaurant = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive search

    // Search restaurants by name
    const restaurants = await Restaurant.find({ name: { $regex: regex } });

    // Search food items by name and include their restaurant
    const foodItems = await FoodItem.find({ name: { $regex: regex } }).populate('restaurant');

    res.status(200).json({ restaurants, foodItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
