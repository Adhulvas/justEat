import Coupon from "../models/coupon.js";

export const createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, expiresAt } = req.body;

    // Check for required fields
    if (!code || !discountType || !discountValue || !expiresAt) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check for valid discountType
    if (!["flat", "percentage"].includes(discountType)) {
      return res.status(400).json({ message: "discountType must be either 'flat' or 'percentage'" });
    }

    // Check if coupon already exists
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    // Create the coupon
    const newCoupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minOrderAmount: minOrderAmount || 0,
      expiresAt
    });

    await newCoupon.save();

    res.status(201).json({ message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllCoupons = async(req,res)=>{
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 })

    res.status(200).json( coupons )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    if (!code || !orderAmount) {
      return res.status(400).json({ message: 'Coupon code and order amount are required' });
    }

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    // Check expiration
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    // Check minimum order amount
    if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount must be ₹${coupon.minOrderAmount} to use this coupon`
      });
    }

    let discount = 0;

    if (coupon.discountType === 'percentage') {
      discount = (orderAmount * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'flat') {
      discount = coupon.discountValue;
    }

    // Optional: if you add maxDiscount later
    // if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    //   discount = coupon.maxDiscount;
    // }

    const finalAmount = orderAmount - discount;

    res.status(200).json({
      message: 'Coupon applied successfully',
      discount,
      finalAmount,
      couponId: coupon._id
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};