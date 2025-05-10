import User from "../models/user.js";
import Address from "../models/address.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/token.js";

export const userSignup = async(req,res) =>{
  try {
    const { name, email, password } = req.body;

    if( !name || !email || !password ) {
      return res.status(400).json({ message: "All fields required"})
    }

    const existingUser = await User.findOne({email})

    if(existingUser) {
      return res.status(400).json({ message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name,email,password:hashedPassword})
    await newUser.save()

    const token = generateToken(newUser,'user')

    res.cookie('token',token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    })

    res.status(200).json({ message: 'Signup Successful'})
  } catch (error) {
    res.status(500).json({ message:error.message || 'Internal server error'})
  }
}


export const userLogin = async(req,res) => {
  try {
    const { email,password} = req.body;
     
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields required'})
    }

    const existingUser = await User.findOne({email});

    if(!existingUser) {
      return res.status(400).json({ message: 'User does not exist'})
    }

    const retrievePassword = await bcrypt.compare(password,existingUser.password)

    if(!retrievePassword) {
      return res.status(400).json({ message: 'Invalid user'})
    }

    const token = generateToken(existingUser,'user')

    res.cookie('token',token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    })

    return res.status(200).json({ message: 'Login successful', name:existingUser.name})
  } catch (error) {
    res.status(500).json({ message:error.message || 'Internal server error'})
  }
}


export const userProfile = async(req,res) => {
  try {
    const userId = req.user.id

    const userProfile = await User.findById(userId).select("-password")

    if (!userProfile) {
      return res.status(404).json({ message:'User not found' });
    }

    res.status(200).json({ success:true, data:userProfile })
  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const userProfileUpdate = async(req,res)=> {
  try {
    const userId = req.user.id

    const { email, phone} = req.body;

    if(!email && !phone) {
      return res.status(400).json({ message: 'Email or phone must be provided'})
    }

    const user = await User.findById(userId)

    if(!user){
      return res.status(400).json({ message: 'User not found'})
    }

    if(email) user.email = email;
    if(phone) user.phone = phone;

    await user.save();

    res.status(200).json({
       message: 'Profile updated successfully',
       user: {
         email:user.email,
         phone:user.phone
        }
      });
      
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error'})
  }
}


export const getAllAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    // Populate user's address array with actual address documents
    const user = await User.findById(userId).populate('address');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ addresses: user.address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addDeliveryAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doorNo, area, landmark, label } = req.body;

    if (!doorNo) return res.status(400).json({ message: 'doorNo cannot be empty' });
    if (!area) return res.status(400).json({ message: 'area cannot be empty' });
    if (!landmark) return res.status(400).json({ message: 'landmark cannot be empty' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newAddress = new Address({
      user: userId,
      doorNo,
      area,
      landmark,
      label
    });

    await newAddress.save();

    user.address.push(newAddress._id); // Save the address ID to the user
    await user.save();

    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const editDeliveryAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;
    const { doorNo, area, landmark, label } = req.body;

    if (!doorNo || !area || !landmark) {
      return res.status(400).json({ message: 'doorNo, area, and landmark are required' });
    }

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ message: 'Address not found' });

    address.doorNo = doorNo;
    address.area = area;
    address.landmark = landmark;
    address.label = label || address.label;

    await address.save();
    res.status(200).json({ message: 'Address updated successfully', address });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteDeliveryAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ message: 'Address not found' });

    // Remove reference from User model
    await User.findByIdAndUpdate(userId, { $pull: { address: addressId } });

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const userLogout = async(req,res) => {
  try {
    res.clearCookie('token')

    res.status(200).json({ message:"Logout successful" })
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}


export const userDeleteAccount = async (req,res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.clearCookie('token', {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })

    res.status(200).json({ success:true, message:'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const checkUser = async(req,res)=>{
  try {
    res.json({ success:true, message:"user authorized" }) 
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}