import jwt from 'jsonwebtoken'

export const userAuth = async(req,res,next)=>{
  try {
    const {token} = req.cookies

    if(!token) {
      return res.status(401).json({ message: 'Unauthorized user' })
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)

    if(!decodedToken) {
      return res.status(401).json({ message: 'User not authorized'})
    }

    req.user = decodedToken

    if(decodedToken.role !== 'user') {
      return res.status(403).json({ message: 'Access forbidden'})
    }
    next()

  } catch (error) {
    return res.status(500).json({message:'Internal server error'})
  }
}