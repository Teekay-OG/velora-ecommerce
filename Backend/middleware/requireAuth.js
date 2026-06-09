const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

  // authorization header
  const { authorization } = req.headers

  // check if token exists
  if (!authorization) {
    return res.status(401).json({
      error: 'Authorization token required'
    })
  }

  // extract token
  const token = authorization.split(' ')[1]

  try {

    // verify token
    const { _id } = jwt.verify(token, process.env.SECRET)

    // find user
    req.user = await User.findOne({ _id }).select('_id')

    // continue to next controller
    next()

  } catch (error) {

    console.log(error)

    res.status(401).json({
      error: 'Request is not authorized'
    })
  }
}

module.exports = requireAuth