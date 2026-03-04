const { default: mongoose } = require("mongoose");


const productSchema = new mongoose.Schema({

  name: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  price: {
    type: Number, required: true
  },
  discountPrice: Number,
  category: {
    type: String, required: true, enum: ["men", "women"]
  },
  frontImage: {
    url: {
      type: String
    },
    thumbnail: {
      type: String
    }
  },
  images: [{
    url: {
      type: String
    },
    thumbnail: {
      type: String
    }
  }],
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
      },
      color: {
        type: String,
        required: true,
      }
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
})


const Product = mongoose.model("product", productSchema);

module.exports = Product