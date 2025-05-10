import jwt from 'jsonwebtoken';

export const restaurantAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized restaurant' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Restaurant not authorized' });
    }

    if (decodedToken.role !== 'restaurant') {
      return res.status(403).json({ message: 'Access forbidden' });
    }

    req.restaurant = decodedToken;
    next();
    
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
