require("dotenv").config()

const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")

const productRoutes = require("./routes/product")
const userRoutes = require("./routes/user")
const orderRoutes = require("./routes/order")

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use("/api/orders", orderRoutes)

// logger middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use("/api/products", productRoutes)
app.use("/api/user", userRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)

  .then(() => {

    app.listen(process.env.PORT, () => {

      console.log(
        "Connected to db & listening on port",
        process.env.PORT
      )

    })

  })

  .catch((error) => {
    console.log(error)
  })