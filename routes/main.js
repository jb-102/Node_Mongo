const router = require('express').Router()
const productController = require('../controllers/products')
const categoryController = require('../controllers/categories')

/* GET home page. */
router.post('/addProduct', productController.addProduct)

router.post('/addCategory', categoryController.addCatgory)

router.post('/addSubCategory', categoryController.addSubCatgory)

// router.post('/addSubSubCatgory', categoryController.addSubSubCatgory)

router.get('/getAllCategories', categoryController.getAllCategories)

router.get('/getProducts/:categoryName', productController.getProducts)

router.put('/updateProduct/:id', productController.updateProduct)

module.exports = router;
