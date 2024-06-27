const express = require('express');

// express-session is needed for passport to work
const serverSession = require('./config/session');  // added in 4.1.7 (more of what I added in 4.1.6)

require('dotenv').config();


// ??? possible fix for logout() method in passport that clears the session requiring a callback function
// when the documentation doesn't call for one.
// move to top of file, maybe express needs to be loaded before serverSession - that contains express-session
//const express = require('express');

// added in at 4.1.6 per copilot advice, w/o this line, the app will not work
// and I get the error:
// Login sessions require session support. Did you forget to use express-session middleware?
// FYI - this code snippet is shown to be added in lesson 4.1.7, they are wrong, it should be added in 4.1.6
// for the login button to work
// also needed to add the "app.use(session({.... " code - shown below
//
// then taken out in 4.1.7, since new file config/session.js was created and the code was moved to that file
// const session = require('express-session');  



const path = require('path');

const routes = require('./controllers');
const app = express();
const PORT = process.env.PORT || 3001;

// added in 4.1.6
const passport = require('passport');
require('./config/passport');

// added in 4.2.6 to prevent hotlinking
const hotlink = require('./utils/hotlink');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// I added this in 4.1.6, should be added in 4.1.6, but added in not 4.1.7 as the lesson shows 
// app.use(session({
//   secret: 'streamingturtles',
//   resave: false,
//   saveUninitialized: false,
// }));
// then taken out in 4.1.7, since new file config/session.js was created 
// and the code was moved to that file which is similiar as here, but the code is in a separate file now
//
// added in 4.1.7
app.use(serverSession); 



// added in 4.1.6
app.use(passport.initialize());
app.use(passport.session());
// added in 4.2.6
app.use(hotlink);





app.use(express.static(path.join(__dirname, '/public')));

// turn on routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
