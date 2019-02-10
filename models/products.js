let mongoose = require('../database/dbConfig')

let productSchema = new mongoose.Schema({
  productName: String,
  productPrice: String,
}, { timestamps: true })

let Category = mongoose.model('Product', productSchema)

module.exports = Category
