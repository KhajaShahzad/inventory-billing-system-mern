const express = require('express');
const {
  createSession,
  addToCart,
  getSession
} = require('../controllers/sessionController');

const router = express.Router();

router.post('/create', createSession);
router.post('/add', addToCart);
router.get('/:id', getSession);

module.exports = router;