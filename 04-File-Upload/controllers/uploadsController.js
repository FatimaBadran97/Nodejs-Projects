const path = require('path')
const statusCodes = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProdectImageLocal = async (req, res) => {
  // console.log(req.files)
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded')
  }
  const imageProduct = req.files.image

  if (!imageProduct.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image')
  }

  const maxSize = 1024 * 1024

  if (imageProduct.size > maxSize) {
    throw new CustomError.BadRequestError('Please Upload Image Smaller 1MB')
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${imageProduct.name}`
  )

  await imageProduct.mv(imagePath)

  return res
    .status(statusCodes.OK)
    .json({ image: { src: `/uploads/${imageProduct.name}` } })
}

const uploadProdectImage = async (req, res) => {
  // console.log(req.files.image)
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  )
  // console.log(result)
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(statusCodes.OK).json({
    image: {
      src: `${result.secure_url}`,
    },
  })
}

module.exports = uploadProdectImage
