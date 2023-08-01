import express from 'express'
import {
  registerController,
  loginController,
  testController,
} from '../controllers/authController.js'

import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
//router object

const router = express.Router()

//routing
//REGISTER || POST METHOD
router.post('/register', registerController)

//LOGIN || POST METHOD
router.post('/login', loginController)

//TEST ROUTE
router.get('/test', requireSignIn, isAdmin, testController)

//Protected ADMIN route
router.get('/admin-login', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true })
})
export default router
