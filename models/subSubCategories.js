let mongoose = require('../database/dbConfig')

let subSubCategorySchema = new mongoose.Schema({
  subSubCategoryName: String,
}, { timestamps: true })

let SubCategory = mongoose.model('SubSubCategory', subSubCategorySchema)

module.exports = SubCategory