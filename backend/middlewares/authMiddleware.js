import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

//PROTECTED ROUTES

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
  }
}

//ADMIN ACCESS

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id)
    if (user.role === 1) {
      next()
    } else {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized Access',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
