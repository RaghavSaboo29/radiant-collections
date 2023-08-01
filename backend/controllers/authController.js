import userModel from '../models/userModel.js'
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body

    if (!name) {
      return res.send({
        error: 'Name is required',
      })
    }
    if (!email) {
      return res.send({
        error: 'Email is required',
      })
    }
    if (!password) {
      return res.send({
        error: 'Password is required',
      })
    }
    if (!phone) {
      return res.send({
        error: 'Phone is required',
      })
    }

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already Registered.',
      })
    }

    const user = await new userModel({
      name,
      email,
      phone,
      password,
      role,
    }).save()

    res.status(201).send({
      success: true,
      message: 'user created',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: 'Invalid Credentials',
      })
    }
    //check user

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email not Registered',
      })
    }
    if (password !== user.password) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Password',
      })
    }
    //Token Creation
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '29d',
    })

    res.status(200).send({
      success: true,
      message: 'Login Successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    })
  }
}

export const testController = (req, res) => {
  res.send('protected routes')
}
