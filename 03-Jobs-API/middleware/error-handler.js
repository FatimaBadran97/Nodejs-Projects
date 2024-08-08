const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    massege: err.message || 'Something went wrong, please try again later'
  }

  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.massege = Object.values(err.errors).map((item) => item.message).join(', ')
  }

  if (err.name === 'CastError') {
    customError.statusCode = StatusCodes.NOT_FOUND
    customError.massege = `No job found with id: ${err.value}`
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.massege = `Duplicated value entered for ${Object.keys(err.keyValue)} field, please choose another value`
  }

  return res.status(customError.statusCode).json({massege: customError.massege})
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})

}

module.exports = errorHandlerMiddleware
