const Product = require("../model/product.model");
const ImageStorage = require("../services/ImageStorage");



const getProducts = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const category = req.query.category

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      message: "Products Fetched Successfully",
      products,
      currentPage: page,
      totalPages,
      totalProducts
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error in Fetching Products!",
      error: error.message
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {

    const productId = req.query.productid;

    const product = await Product.findById({ productId });


    return res.status(200).json({
      message: "Product Fetched Successfully",
      product
    });


  } catch (error) {
    return res.status(500).json({
      message: "Error in Fetching Product!",
      error: error.message
    });
  }
}


const createProduct = async (req, res) => {
  try {
    const { name, description, price, discountPrice, category, totalStock, variants } = req.body;

    const images = req.files;
    if (!name || !description || !price || !category || !images || !totalStock) {
      return res.status(400).json({
        message: "Please Enter all Details",
      });
    }

    if (images.length < 2 || images.length > 4) {
      return res.status(400).json({
        message: "Please Only Select Images 2 to 4",
      });
    }

    console.log(req.body);

    const parsedVariants = JSON.parse(req.body.variants);


    const uploadImages = await ImageStorage(images);


    const firstImage = uploadImages[0];

    const product = new Product({ name, description, frontImage: firstImage, price, discountPrice, category, totalStock, variants: parsedVariants, images: uploadImages })


    await product.save();
    return res.json({
      message: "Product Created successfully",
      product
    })


  } catch (error) {
    return res.status(500).json({
      message: "Error in Creating Product!",
      error: error.message
    });
  }
}


module.exports = { getProducts, getSingleProduct, createProduct }