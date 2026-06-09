require("dotenv").config()

const mongoose = require("mongoose")

const Product = require("./models/productModel")

const products = [

  {
    name: "Velora Essential Hoodie",
    price: 120,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    category: "Hoodies",
    description: "Premium heavyweight cotton hoodie.",
    brand: "Velora"
  },

  {
    name: "Velora Street Sneakers",
    price: 180,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Shoes",
    description: "Modern streetwear sneakers.",
    brand: "Velora"
  },

  {
    name: "Velora Classic Tee",
    price: 60,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "T-Shirts",
    description: "Minimal everyday t-shirt.",
    brand: "Velora"
  },

  {
    name: "Velora Denim Jacket",
    price: 150,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "Jackets",
    description: "Classic denim jacket.",
    brand: "Velora"
  },

  {
    name: "Velora Running Shoes",
    price: 210,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    category: "Shoes",
    description: "Performance running shoes.",
    brand: "Velora"
  },

  {
    name: "Velora Oversized Tee",
    price: 70,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    category: "T-Shirts",
    description: "Relaxed oversized fit.",
    brand: "Velora"
  },

  {
    name: "Velora Premium Hoodie",
    price: 140,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "Hoodies",
    description: "Luxury cotton hoodie.",
    brand: "Velora"
  },

  {
    name: "Velora Leather Watch",
    price: 250,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    category: "Accessories",
    description: "Elegant leather watch.",
    brand: "Velora"
  },

  {
    name: "Velora Backpack",
    price: 110,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Accessories",
    description: "Minimal travel backpack.",
    brand: "Velora"
  },

  {
    name: "Velora Bomber Jacket",
    price: 190,
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    category: "Jackets",
    description: "Modern bomber jacket.",
    brand: "Velora"
  },

  {
    name: "Velora Urban Sneakers",
    price: 170,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111",
    category: "Shoes",
    description: "Urban lifestyle sneakers.",
    brand: "Velora"
  },

  {
    name: "Velora Sports Tee",
    price: 55,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    category: "T-Shirts",
    description: "Breathable sports t-shirt.",
    brand: "Velora"
  },

  {
    name: "Velora Winter Hoodie",
    price: 160,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    category: "Hoodies",
    description: "Warm fleece hoodie.",
    brand: "Velora"
  },

  {
    name: "Velora Sunglasses",
    price: 95,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    category: "Accessories",
    description: "Premium UV protection.",
    brand: "Velora"
  },

  {
    name: "Velora Luxury Jacket",
    price: 280,
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504",
    category: "Jackets",
    description: "Luxury tailored jacket.",
    brand: "Velora"
  }

]

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

  await Product.deleteMany()

  await Product.insertMany(products)

  console.log("Products seeded successfully ✅")

  process.exit()

})

.catch(error => {

  console.log(error)

  process.exit(1)

})