const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

  customer: {
    fullName: String,
    email: String,
    address: String,
    city: String,
    country: String,
    zipCode: String
  },

  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  total: {
    type: Number,
    required: true
  }

}, {
  timestamps: true
})

module.exports = mongoose.model(
  "Order",
  orderSchema
)