
const router = require('express').Router();

// added in at 4.1.6
const passport = require('passport');  




router.get('/session', async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).json(err);
  }
});


// added in at 4.1.6
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);


// added in at 4.1.6
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  async (req, res) => {
    console.log(req.user.first_name); // log the value to the console
    console.log(req.user);
    // if (!req.user.first_name) {
    if (!req.user.github_id) {   // github_id is the value that is returned from the github api, not a first_name
      res.redirect('/profile/');
      // res.redirect('https://streamingturtles.com');
    } else {
      res.redirect('/directory/');
      // res.redirect('https://streamingturtles.com');
    }
    
  }
  
);

// this code will always take you to '/' - no condition check is done
// , unlike above code that redirects to '/profile/' or '/directory/' based on the condition
// router.get(
//   '/github/callback',
//   passport.authenticate('github', { failureRedirect: '/' }),
//   async (req, res) => {
//     // Redirect to the home page after every login
//     res.redirect('/');
//   }
// );


// IMPORTANT:
// this code works when using passport.js 0.5.0 (latest stable version)
// I opted not to use this version, since it is not the latest version
// In this version - you don't need a callback function when uisng logout() method
//
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });


// IMPORTANT:
// this code works using passport.js VERSION 0.7.0 
// SEEM LIKE the latest version - requires a callback function
// I was getting errors when I didn't use a callback function
// this is the version I decided to use, since it is the latest version 
// the logout() method in passport.js only works when you use a callback function to redirect the URL
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});




module.exports = router;
