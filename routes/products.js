const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  popularInWomen,
  newCollection,
} = require('../controllers/products');

const multer = require('../controllers/multer');

router
  .route('/')
  .get(getAllProducts)
  .post(multer.single('imgPath'), addProduct)
  .delete(deleteProduct)
  .put(multer.single('imgPath'), updateProduct);

router.get('/popularwomen', popularInWomen);
router.get('/newcollection', newCollection);

module.exports = router;
