
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


// added in 4.2.5
const filter = (req, file, cb) => {
  const types = ['image/png', 'image/jpg', 'image/jpeg', 'image.gif'];

  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg, .jpeg, and .gif allowed'), false);
  }
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 }, // added in 4.2.5
  fileFilter: filter,           // added in 4.2.5
}).single('avatar');

module.exports = { upload };