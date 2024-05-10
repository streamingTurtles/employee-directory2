// 4.1.8 - Middleware added to:
// - to check if user is logged to prevent accessing the directory route
// - to prevent logged-in users from creating multiple profile entries in the database
// Here we check to see if req.user exists, since that should be set only once a user 
// has logged in. If the user object does exist, then we prompt Express.js 
// to continue with next(). If we don't see the user object, then we redirect the user.

const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).redirect("/");
    }
  };


// we need to fix the problem of multiple profiles being created by the same user 
// this is the case of when a user has already created a profile and is logging in again.   
// we don't want multiple profiles to be created by the same user.
// prevents logged-in users from creating multiple profile entries in the database
// The middleware checks to see if the user is logged in and if they have already created a profile.
// If the user is logged in and has not created a profile, the middleware allows the request to continue.
// If the user is logged in and has already created a profile, the middleware redirects the user to the profile page.
// If the user is not logged in, the middleware redirects the user to the sign-in page.
//
const hasProfile = async (req, res, next) => {
    if (!req.user) {
      res.status(401).redirect("/");
    } else if (!req.user.first_name) {
      next();
    } else {
      res.status(401).redirect("/directory");
    }
  };






  module.exports = { isLoggedIn, hasProfile };


