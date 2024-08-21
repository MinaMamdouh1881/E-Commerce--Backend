const productModule = require('../modules/products');

const getDataByCategory = async (req, res) => {
  const { cat } = req.params;

  try {
    let products = await productModule.find();
    products = products.filter((el) => el.category === cat);

    if (!products.length) return res.json({ success: false, msg: 'Not Found' });
    res.json({ success: true, products });
  } catch (error) {
    console.log('Error in getDataByCategory');
  }
};

module.exports = { getDataByCategory };
