import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cloudinary from 'cloudinary'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

//configure env
// dotenv.config()
dotenv.config({ path: 'backend/.env' })

const __filename= fileURLToPath(import.meta.url)
const __dirname= path.dirname(__filename)

//database config
connectDB()

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(express.static(path.join(__dirname, '../client')))

//routes

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
// app.use('/')

// rest api
// app.get('/', (req, res) => {
//   res.send({
//     message: 'Welcome to ecommerce app',
//   })
// })
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
})

//PORT
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}...`)
})
