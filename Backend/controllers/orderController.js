const Order = require("../models/orderModel")

const getOrders = async (req, res) => {

  const orders = await Order.find({})
    .sort({ createdAt: -1 })

  res.status(200).json(orders)
}

const createOrder = async (req, res) => {

  try {

    const order =
      await Order.create(req.body)

    res.status(200).json(order)

  } catch (error) {

    res.status(400).json({
      error: error.message
    })
  }
}

module.exports = {
  getOrders,
  createOrder
}