// app.js

const express = require('express');
const cors = require('cors'); // <-- Import CORS
const app = express();

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// ✅ Enable CORS for requests from Angular frontend
app.use(cors({
  origin: 'http://localhost:4200', // <-- Frontend origin
  credentials: true
}));

// Middleware
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


module.exports = app;
