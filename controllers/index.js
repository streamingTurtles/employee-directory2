const router = require('express').Router();

const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./api');

// added in at 4.1.6
const authRoutes = require('./auth');



router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

// added in at 4.1.6
router.use('/login', authRoutes);



module.exports = router;
