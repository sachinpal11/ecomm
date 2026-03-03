const Product = require("../model/product.model")




const getProducts = async (req, res) => {

  try {

    const products = await Product.find({});


    return res.status(200).json({
      message: "Product Fetched Successfully",
      products
    })

  } catch (error) {
    return res.json({
      message: "Error in Fetching Products!",
      error
    })
  }


}



module.exports = { getProducts }