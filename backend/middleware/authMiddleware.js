const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Retrieve the 'Authorization' header
  const authHeader = req.headers['authorization'];

  // If the header is present, split it to get the token
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // If no token is found, respond with 401 Unauthorized
  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    // If token is invalid or expired, return 403 Forbidden
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
