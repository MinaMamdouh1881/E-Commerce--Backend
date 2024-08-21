const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const products = require('./routes/products');
const categories = require('./routes/categories');
const sigh_up = require('./routes/sign_up');
const login = require('./routes/login');
const savecart = require('./routes/savecart');

app.use(cors());
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connecter To DB'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/products', products);
app.use('/api/products/categories', categories);
app.use('/signup', sigh_up);
app.use('/login', login);
app.use('/savecart', savecart);
app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use(express.static('./public'));

// const productModule = require('./modules/products');
// const all_product = require('./all_product');
// all_product.map(async (product) => {
//   const { name, category, imgPath, newPrice, oldPrice } = product;
//   await productModule
//     .create({ name, category, imgPath, newPrice, oldPrice })
//     .then((data) => console.log("done"))
//     .catch((err) => console.log(err));
// });

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
