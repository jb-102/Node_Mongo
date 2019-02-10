let mongoose = require('../database/dbConfig')
let Schema = mongoose.Schema

let subCategorySchema = new mongoose.Schema({
  subCategoryName: String,
  subSubCatgories: [{ type: Schema.Types.ObjectId, ref: 'SubSubCatgory' }]
}, { timestamps: true })

let SubCategory = mongoose.model('SubCategory', subCategorySchema)

module.exports = SubCategory
