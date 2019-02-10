let mongoose = require('../database/dbConfig')
let Schema = mongoose.Schema
// let childCategorySchema = require('../models/childCategories')

let categorySchema = new mongoose.Schema({
  categoryName: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
}, { timestamps: true })

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
