const { isLoggedIn, hasProfile } = require('../utils/auth');   // 4.1.8 - added this line of code
// isLoggedIn is a middleware function that checks if a user is logged in
// hasProfile is a middleware so that only users without a can visit our profile creatioj page
const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'views', 'SignIn.html'));
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4.1.8 added "hasProdfile" middleware to the route so only users wiithout a profile can visit the profile creation page
router.get('/profile', hasProfile, async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'views', 'DirectoryForm.html'));
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// 4.1.8 - update this directory route to only be accessible to logged-in users
// 4.1.8 - added the "isLoggedIn" middleware to the route, added as a second argument to the .get() method of the router object
// this route will only be accessible to logged-in users
// so that only logged-in users can only visit the directory route
// This isLoggedIn middleware solves the problem that non-logged-in users can go straight to the 
// Directory page, but we still have the problem that multiple profiles can be made by the same
// user. We'll need to create a second middleware to deal with this.
// 
// NOW, only logged-in users can access the directory route
// next we need to deal with the problem of multiple profiles being created by the same user
// fix this in "utils/auth.js" file
router.get('/directory', isLoggedIn, async (req, res) => {  
  try {
    res.sendFile(path.join(__dirname, '../', 'views', 'Directory.html'));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
