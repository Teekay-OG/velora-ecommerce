const Product = require("../models/productModel")
const mongoose = require("mongoose")

// GET all products
const getProducts = async (req, res) => {

  const products = await Product.find({})
    .sort({ createdAt: -1 })

  res.status(200).json(products)
}

// GET single product
const getProduct = async (req, res) => {

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "No such product"
    })
  }

  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).json({
      error: "No such product"
    })
  }

  res.status(200).json(product)
}

// CREATE product
const createProduct = async (req, res) => {

  const {
    name,
    price,
    image,
    category,
    description,
    brand
  } = req.body

  try {

    const product = await Product.create({
      name,
      price,
      image,
      category,
      description,
      brand
    })

    res.status(200).json(product)

  } catch (error) {

    res.status(400).json({
      error: error.message
    })
  }
}

// DELETE product
const deleteProduct = async (req, res) => {

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "No such product"
    })
  }

  const product = await Product.findByIdAndDelete(id)

  if (!product) {
    return res.status(404).json({
      error: "No such product"
    })
  }

  res.status(200).json(product)
}

// UPDATE product
const updateProduct = async (req, res) => {

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "No such product"
    })
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      ...req.body
    },
    {
      new: true,
      runValidators: true
    }
  )

  if (!product) {
    return res.status(404).json({
      error: "No such product"
    })
  }

  res.status(200).json(product)
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct
}