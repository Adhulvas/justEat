import Cart from '../models/cart.js';
import FoodItem from '../models/foodItem.js';

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('addtoCart =======', userId)
    const { foodItemId, quantity } = req.body;

    if (!foodItemId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Food item and valid quantity are required' });
    }

    
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.foodItem.toString() === foodItemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodItem: foodItemId, quantity });
    }

    await cart.populate('items.foodItem'); // make sure foodItem is populated to access price
    let total = 0;
    cart.items.forEach(item => {
      total += item.foodItem.price * item.quantity;
    });

    cart.totalPrice = total;

    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodItemId } = req.params;

    if (!foodItemId) {
      return res.status(400).json({ message: 'Food item ID is required in params' });
    }

    const cart = await Cart.findOne({ user: userId }).populate('items.foodItem');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove item
    cart.items = cart.items.filter(item => item.foodItem._id.toString() !== foodItemId);

    // Recalculate total price
    let total = 0;
    cart.items.forEach(item => {
      total += item.foodItem.price * item.quantity;
    });

    cart.totalPrice = total;

    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodItemId, action } = req.body;

    if (!foodItemId || !['increase', 'decrease'].includes(action)) {
      return res.status(400).json({ message: 'Invalid food item or action' });
    }

    const cart = await Cart.findOne({ user: userId }).populate('items.foodItem');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.foodItem._id.toString() === foodItemId);
    if (!item) {
      return res.status(404).json({ message: 'Food item not found in cart' });
    }

    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease') {
      item.quantity -= 1;
      if (item.quantity < 1) {
        // Remove the item from cart if quantity is less than 1
        cart.items = cart.items.filter(i => i.foodItem._id.toString() !== foodItemId);
      }
    }

    // Recalculate total price
    let total = 0;
    cart.items.forEach(item => {
      total += item.foodItem.price * item.quantity;
    });
    cart.totalPrice = total;

    await cart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCartItems = async (req,res)=> {
  try {
    const userId = req.user.id;
    console.log('getcartitems ========', userId)

    const cart = await Cart.findOne({ user: userId }).populate('items.foodItem')

    if(!cart || cart.items.length === 0) {
      return res.status(200).json({ message: 'Your cart is empty', cart: { items: [], totalPrice: 0 }})
    }

    res.status(200).json({ cart })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}