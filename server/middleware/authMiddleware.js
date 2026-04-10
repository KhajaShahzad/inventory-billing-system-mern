const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  // temp

  const protect = (req, res, next) => {
  let token;

  console.log("AUTH HEADER:", req.headers.authorization); // 👈 ADD THIS

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      console.log("TOKEN:", token); // 👈 ADD THIS

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded); // 👈 ADD THIS

      req.user = decoded;

      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message); // 👈 ADD THIS
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

  // Check token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = decoded;


      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;