import Restaurant from "../models/restaurant.js";
import { generateToken } from "../utils/token.js";
import FoodItem from "../models/foodItem.js"
import bcrypt from 'bcrypt'


export const restaurantSignup = async(req,res)=>{
  try {
    const { name, email, password, phone, outlet } = req.body;

    if(!name || !email || !password || !phone || !outlet ){
      return res.status(400).json({ message: 'All fields are required'})
    }
     
    const existingRestuarant = await Restaurant.findOne({ email })
    if(existingRestuarant){
      return res.status(400).json({ message: 'Restuarant already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newRestaurant = new Restaurant({
      name,
      email,
      password: hashedPassword,
      phone,
      outlet
    })

    await newRestaurant.save();

    const token = generateToken(newRestaurant,'restaurant')

    res.cookie('token',token,{
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });

    return res.status(201).json({ message: 'Signup successful'})

  } catch (error) {
    return res.status(500).json({ message: error.message || 'Internal server error'})
  }
}


export const restaurantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingRestaurant = await Restaurant.findOne({ email });
    if (!existingRestaurant) {
      return res.status(400).json({ message: 'Restaurant does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, existingRestaurant.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(existingRestaurant, 'restaurant');

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });

    return res.status(200).json({
      message: 'Login successful'
    });

  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};


export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, restaurants });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch restaurants', error: error.message });
  }
};


export const getRestaurantDetailsWithFoodItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    // Fetch restaurant details
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Fetch food items
    const foodItems = await FoodItem.find({ restaurant: restaurantId }).populate('category', 'name');

    res.status(200).json({ restaurant, foodItems });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const getRestaurantsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Step 1: Find food items with that category and collect unique restaurant IDs
    const foodItems = await FoodItem.find({ category: categoryId }).select('restaurant');

    const restaurantIds = [...new Set(foodItems.map(item => item.restaurant.toString()))];

    if (restaurantIds.length === 0) {
      return res.status(404).json({ message: 'No restaurants found for this category' });
    }

    // Step 2: Fetch restaurant details using those IDs
    const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } });

    res.status(200).json({ restaurants });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};