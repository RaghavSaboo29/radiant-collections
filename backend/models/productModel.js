import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    product_id: {
      type: Number,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: 'Category',
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    quantity: {
      type: Boolean,
      default: true,
    },
    trending: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Products', productSchema)
