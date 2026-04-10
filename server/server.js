const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// ✅ MIDDLEWARE (ORDER IMPORTANT)
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// ✅ ROUTES
const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/session', sessionRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ✅ SOCKET
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// ✅ PROTECTED ROUTE
const protect = require('./middleware/authMiddleware');

app.get('/api/protected', protect, (req, res) => {
  res.json({
    message: 'You accessed protected route',
    user: req.user
  });
});

// ✅ TEST ROUTE
app.get('/', (req, res) => {
  res.json({ message: '🚀 Inventory Billing API is running!' });
});

// ✅ DB + SERVER START
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    server.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.log('❌ MongoDB error:', err));