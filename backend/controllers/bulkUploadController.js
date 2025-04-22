const Product = require('../models/Product');
const fs = require('fs');
const csv = require('csv-parser');  // For CSV files
const xlsx = require('xlsx');      // For XLSX files

// Bulk Upload Controller
exports.bulkUpload = async (req, res) => {  // <-- Make the function async
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const filePath = req.file.path;
  
    // Determine file type (CSV or XLSX)
    const fileExtension = req.file.originalname.split('.').pop();
  
    let products = [];
  
    if (fileExtension === 'csv') {
      // Parse CSV file
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          products.push({
            name: row.name,
            price: parseFloat(row.price),
            image: row.image,
            categoryId: parseInt(row.categoryId),
          });
        })
        .on('end', async () => {  // <-- Make the end function async
          await bulkInsert(products, res);
        })
        .on('error', (err) => {
          return res.status(500).json({ message: 'Error parsing CSV', error: err.message });
        });
    } else if (fileExtension === 'xlsx') {
      // Parse XLSX file
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json(sheet);
  
      rows.forEach((row) => {
        products.push({
          name: row.name,
          price: parseFloat(row.price),
          image: row.image,
          categoryId: parseInt(row.categoryId),
        });
      });
  
      await bulkInsert(products, res);  // <-- You can directly await this here as well
    } else {
      return res.status(400).json({ message: 'Unsupported file type. Only CSV and XLSX are allowed.' });
    }
  };
  
  // Function to insert products in bulk
  const bulkInsert = async (products, res) => {
    try {
      // Insert products in bulk using Sequelize
      await Product.bulkCreate(products);
      res.status(200).json({ message: 'Products uploaded successfully', products });
    } catch (err) {
      res.status(500).json({ message: 'Error inserting products', error: err.message });
    }
  };
  