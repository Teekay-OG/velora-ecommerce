const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d"
  })
}

// SIGNUP
const signupUser = async (req, res) => {

  const { name, email, password } = req.body

  try {

    if (!email || !password || !name) {
      throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid")
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough")
    }

    const exists = await User.findOne({ email })

    if (exists) {
      throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hash
    })

    const token = createToken(user._id)

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })

  } catch (error) {

    res.status(400).json({
      error: error.message
    })

  }
}

// LOGIN
const loginUser = async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })

    if (!user) {
      throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(
      password,
      user.password
    )

    if (!match) {
      throw Error("Incorrect password")
    }

    const token = createToken(user._id)

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token
    })

  } catch (error) {

    res.status(400).json({
      error: error.message
    })

  }
}

module.exports = {
  signupUser,
  loginUser
}