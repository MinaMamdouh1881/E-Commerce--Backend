const productModule = require('../modules/products');
const fs = require('fs');

//get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productModule.find();
    res.json({ success: true, products });
  } catch (error) {
    console.log('Error in getAllProducts');
  }
};

//add products
const addProduct = async (req, res) => {
  const { name, category, newPrice, oldPrice } = req.body;
  if (!name || !category || !req?.file?.filename || !newPrice || !oldPrice)
    return res.json({ success: false, msg: 'Provide Your Product Details' });

  await productModule
    .create({ ...req.body, imgPath: req.file.filename, amount: 1 })
    .then(() => res.json({ success: true, msg: 'Product Successfully Added' }))
    .catch((err) => {
      console.log('Error in addProduct');

    });
};

//delete product
const deleteProduct = async (req, res) => {
  const { _id } = req.body;
  if (!_id) return res.json({ success: false, msg: 'Provide Your Product id' });

  try {
    const product = await productModule.findById(_id);
    if (!product) return res.json({ success: false, msg: 'Not Found' });

    if (
      product.name == 'Boys Orange Colourblocked Hooded Sweatshirt' ||
      product.name ==
        'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket' ||
      product.name == 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse'
    ) {
      return res.json({ success: false, msg: "you can't delete this product" });
    }

    await productModule.findByIdAndDelete(_id).then((data) => {
      fs.unlink(`./public/${data?.imgPath}`, (err) => {
        if (err) console.log(err);
      });
      res.json({ success: true, msg: 'Delete Success' });
    });
  } catch (error) {
    console.log('Error in deleteProduct : ',error );
  }
};

//update product
const updateProduct = async (req, res) => {
  const { _id, name, category, newPrice, oldPrice, amount } = req.body;
  if (!_id) return res.json({ success: false, msg: 'Provide Your Product id' });

  try {
    const product = await productModule.findById(_id);
    if (!product) return res.json({ success: false, msg: 'Not Found' });
    if (
      product.name == 'Boys Orange Colourblocked Hooded Sweatshirt' ||
      product.name ==
        'Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket' ||
      product.name == 'Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse'
    ) {
      return res.json({ success: false, msg: "you can't update this product" });
    }

    if (req.file) {
      fs.unlink(`./public/${product?.imgPath}`, (err) => {
        if (err) console.log(err);
      });
      await productModule
        .findByIdAndUpdate(_id, {
          name,
          category,
          imgPath: req.file.filename,
          newPrice,
          oldPrice,
          amount,
        })
        .then(() =>
          res.json({ success: true, msg: 'Product Successfully updated' })
        );
    } else {
      await productModule
        .findByIdAndUpdate(_id, {
          name,
          category,
          newPrice,
          oldPrice,
          amount,
        })
        .then(() =>
          res.json({ success: true, msg: 'Product Successfully updated' })
        );
    }
  } catch (error) {
    console.log('Error in updateProduct');
  }
};

//Popular in Women
const popularInWomen = async (req, res) => {
  try {
    let products = await productModule.find();
    products = products.filter((el) => el.category === 'women');
    res.json({ success: true, products: products.slice(0, 4) });
  } catch (error) {
    console.log('Error in popularInWomen');
  }
};

//new collection
const newCollection = async (req, res) => {
  try {
    let products = await productModule.find();
    products = products.filter(
      (el) =>
        el.imgPath === 'product_12.png' ||
        el.imgPath === 'product_35.png' ||
        el.imgPath === 'product_14.png' ||
        el.imgPath === 'product_8.png' ||
        el.imgPath === 'product_15.png' ||
        el.imgPath === 'product_2.png' ||
        el.imgPath === 'product_17.png' ||
        el.imgPath === 'product_28.png'
    );

    res.json({ success: true, products });
  } catch (error) {
    console.log('Error in newCollection');
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  popularInWomen,
  newCollection,
};
