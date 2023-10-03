const productModel = require("../models/productModel");

// @desc Get Products
// route GET /api/v1/products
// @access Private
const getAllProductController = async (req, res) => {
  try {
    //Get all products from database
    const products = await productModel
      .find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "All products get successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting products",
      error,
    });
  }
};

// @desc Create Product
// route POST /api/v1/products
// @access Private
const createProductController = async (req, res) => {
  const { name, category, price } = req.body;
  try {
    if (!name) {
      return res.json({ message: "Name is required" });
    }
    if (!category) {
      return res.json({ message: "Price is required" });
    }
    if (!price) {
      return res.json({ message: "Price is required" });
    }

    //store products to database
    const product = await productModel.create({
      user_id: req.user._id,
      name,
      category,
      price,
    });
    res.status(200).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating item",
      error,
    });
  }
};

// @desc Update Product
// route PUT /api/v1/products/:id
// @access Private
const updateProductController = async (req, res) => {
  const { name, category, price } = req.body;
  try {
    if (!name) {
      return res.json({ message: "Name is required" });
    }
    if (!category) {
      return res.json({ message: "Price is required" });
    }
    if (!price) {
      return res.json({ message: "Price is required" });
    }

    //updating product from database
    const product = await productModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating product",
      error,
    });
  }
};

// @desc Delete Product
// route DELETE /api/v1/products/:id
// @access Private
const deleteProductController = async (req, res) => {
  try {
    //delete product from database
    await productModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in deleting product",
      error,
    });
  }
};

module.exports = {
  getAllProductController,
  createProductController,
  updateProductController,
  deleteProductController,
};
