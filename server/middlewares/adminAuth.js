import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized admin' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Admin not authorized' });
    }

    if (decodedToken.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }

    req.admin = decodedToken;
    next();

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
