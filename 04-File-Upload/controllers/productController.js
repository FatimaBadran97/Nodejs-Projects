const Product = require('../models/Product')
const statusCodes = require('http-status-codes')

const createProdect = async (req, res) => {
  console.log(req.body)
  const product = await Product.create(req.body)
  res.status(statusCodes.CREATED).json({ product })
}

const getAllProdects = async (req, res) => {
  const products = await Product.find()

  res.status(statusCodes.OK).json({ products, count: products.length })
}

module.exports = {
  createProdect,
  getAllProdects,
}
