// server.js

const app = require('./app'); // Import app instance
const sequelize = require('./config/database'); // Database configuration
require('dotenv').config();

// Import models (to ensure they are loaded and registered)
require('./models/User');
require('./models/Category');
require('./models/Product');

const PORT = process.env.PORT || 5000;

require('dotenv').config();  // Load environment variables from .env

// Sync database and start server
sequelize.sync({ alter: true }) // Sync models
  .then(() => {
    console.log('✅ DB synced successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });
