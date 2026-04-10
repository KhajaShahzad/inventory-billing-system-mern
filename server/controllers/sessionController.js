const Product = require('../models/product');

const sessions = {};

// CREATE SESSION
const createSession = (req, res) => {
  const sessionId = Date.now().toString();

  sessions[sessionId] = {
    cart: []
  };

  res.json({ sessionId });
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { sessionId, barcode } = req.body;

    const session = sessions[sessionId];
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const product = await Product.findOne({ barcode });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    session.cart.push(product);

    res.json({ success: true, cart: session.cart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SESSION
const getSession = (req, res) => {
  const session = sessions[req.params.id];

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  res.json(session);
};

module.exports = {
  createSession,
  addToCart,
  getSession,
  sessions
};