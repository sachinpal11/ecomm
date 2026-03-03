const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({

  name: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  price: {
    type: String, required: true
  },
  discountPrice: String,
  category: {
    type: String, required: true
  },
  images: {
    type: [String], required: true
  },
  totalStock: {
    type: Number, required: true
  },
  variants: [
    {
      size: {
        type: String,
        required: true,
        enum: ["S", "M", "L", "XL", "XXL", "XXXL"]
      },
      stock: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  rating: {
    type: Number
  },
  numReviews: {
    type: Number
  },
  featured: {
    type: Boolean,
    default: false
  }
})


const Product = mongoose.model("product", productSchema);

module.exports = Product