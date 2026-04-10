const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  barcode: String
});

module.exports = mongoose.model('Product', productSchema);