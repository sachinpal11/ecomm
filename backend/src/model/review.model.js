const { default: mongoose } = require("mongoose");


const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  rating: {
    type: Number, required: true
  },
  comment: String
})


const Review = mongoose.model("review", reviewSchema);


module.exports = Review