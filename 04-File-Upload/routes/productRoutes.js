const express = require('express')
const router = express.Router()

const {
  createProdect,
  getAllProdects,
} = require('../controllers/productController')
const uploadProdectImage = require('../controllers/uploadsController')

router.route('/').post(createProdect).get(getAllProdects)
router.route('/uploads').post(uploadProdectImage)

module.exports = router
