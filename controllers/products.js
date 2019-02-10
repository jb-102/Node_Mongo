const Product = require('../models/products')
const Category = require('../models/categories')

exports.addProduct = function (req, res) {
  let product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
  })
  product.save(function (err, newProduct) {
    if (err) {
      res.send({
        responseCode: 401,
        responseMessage: 'Error creating new agent.'
      })
    } else {
      Category.findOneAndUpdate(
        { categoryName: { $in: req.body.categories } },
        { $push: { products: newProduct._id } },
        function (err, updatedCategory) {
          if (err) {
            res.send({
              responseCode: 501,
              responseMessage: 'ERROR CREATING SUBCATEGORY'
            })
          } else {
            res.send({
              responseCode: 200,
              responseMessage: 'SUCCESS',
              responseData: newProduct
            })
          }
        })
    }
  })
}

exports.getProducts = function (req, res) {

  Category.findOne({
    'categoryName': req.params.categoryName
  }, function (err, category) {

    if (err || !category) {
      res.send({
        responseCode: 401,
        responseMessage: 'COULD NOT LOCATE THE DATA REQUESTED'
      })
    } else {
      Product.find({ '_id': { $in: category.products } }, function (err, subCategories) {
        if (err || !subCategories.length) {
          res.send({
            responseCode: 401,
            responseMessage: 'COULD NOT LOCATE THE DATA REQUESTED'
          })
        } else {
          res.send({
            responseCode: 200,
            responseMessage: 'SUCCESS',
            responseData: subCategories
          })
        }
      })
    }
  })
}

exports.updateProduct = function (req, res) {
  Product.findOne({ '_id': req.params.id }, function (err, product) {
    if (err || !product) {
      res.send({
        responseCode: 401,
        responseMessage: 'COULD NOT LOCATE THE DATA REQUESTED'
      })
    } else {
      product.productName = req.body.productName || product.productName
      product.productPrice = req.body.productPrice || product.productPrice
      product.save(function (err, updatedProduct) {
        res.send({
          responseCode: 200,
          responseMessage: 'SUCCESS',
          responseData: updatedProduct
        })
      })
    }
  })
}