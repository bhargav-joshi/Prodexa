const multer = require('multer');
const path = require('path');

// Define storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Set file upload limits (optional)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size = 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /csv|xlsx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only CSV or XLSX allowed.'));
    }
  },
}).single('file'); // 'file' is the field name from the form

module.exports = upload;
