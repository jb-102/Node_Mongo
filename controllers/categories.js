
const Category = require('../models/categories')
const SubCategory = require('../models/subCatgories')
const SubSubCategory = require('../models/subSubCategories')

exports.addCatgory = function (req, res) {
  let category = new Category({
    categoryName: req.body.categoryName
  })
  category.save(function (err, newCategory) {
    if (err) {
      res.send({
        responseCode: 401,
        responseMessage: 'Error creating new agent.'
      })
    } else {
      res.send({
        responseCode: 200,
        responseMessage: 'SUCCESS',
        responseData: newCategory
      })
    }
  })
}

exports.getAllCategories = function (req, res) {
  Category.find({}).populate({
    path: 'subCategories',
    populate: { path: 'subCategories' }
  }).exec(function (err, categories) {
    if (err || !categories.length) {
      res.send({
        responseCode: 401,
        responseMessage: 'COULD NOT LOCATE THE DATA REQUESTED'
      })
    } else {
      res.send({
        responseCode: 200,
        responseMessage: 'SUCCESS',
        responseData: categories
      })
    }
  })
}

exports.addSubCatgory = function (req, res) {
  let subCategory = new SubCategory({
    subCategory: req.body.subCategoryName
  })
  subCategory.save(function (err, newSubCategory) {
    if (err) {
      res.send({
        responseCode: 401,
        responseMessage: 'Error creating new agent.'
      })
    } else {
      Category.findOneAndUpdate(
        { categoryName: req.body.categoryName },
        { $push: { subCategories: newSubCategory._id } },
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
              responseData: newSubCategory
            })
          }
        })
    }
  })
}

// exports.addSubSubCatgory = function (req, res) {

// }