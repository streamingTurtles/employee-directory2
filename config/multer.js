
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/thumbnails');
  },
  filename: (req, file, cb) => {
    const fileName = `avatar-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },

});