

const multer = require('multer'); // 4.2.4 - added this line of code
const { upload } = require('../../config/multer'); // 4.2.4 - added this line of code

const { isLoggedIn, hasProfile } = require('../../utils/auth');  // 4.1.8 - added this line of code
const router = require('express').Router();
require('dotenv').config();
const { Person, Address } = require('../../models');


// 4.1.8 - added the "isLoggedIn" middleware to the route
router.get('/', isLoggedIn, async (req, res) => {    
  try {
    const { rows } = await Person.getAll();

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

/*
// 4.1.8 - added the "hasProfile" middleware to the post route - to prevent logged-in users from creating multiple profile entries in the database
router.post('/', hasProfile, async (req, res) => {
  try {
    const newPersonEnrty = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      // 4.1.7 - commented out the below code and added the req.user.github_id code below, note the 
      // diffence between req.body.github_id and req.user.github_id
      // use req.user.github_id if you want to use the authenticated user's GitHub ID, and req.body.github_id if you want to use a GitHub ID sent by the client in the request body. The correct one to use depends on the specific requirements of your application.
      // github_id: '0123456789'
      github_id: req.user.github_id  // not to use the github_id: req.body.github_id, since we are using the github_id from the authenticated user, not from the request body that is sent by the client usually in a form or a json object that is sent by the client to the server, not the github_id from the authenticated user from the github api that is returned to the server from the github api after the user has authenticated with the github api and the server has received the github_id from the github api server.
    };
    
    const personsAddress = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
    };

    const { rows } = await Person.create(newPersonEnrty);

    await Address.create({
      ...personsAddress,
      person_id: rows[0].id,
    });

    // 4.1.7 - commented out the below code and added the req.login code below
    // res.status(200).json({ message: 'Success' });
    req.login(newPersonEntry, () => {
      res.status(200).json({ message: 'Success'});
    });



  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});
*/







// replace the above code with the below code added at section 4.2.4
// We need to wrap the POST route using the upload function so that we get access to the req.file object provided by multer.
router.post('/', hasProfile, async (req, res) => {
  upload(req, res, async (err) => { 

    // added the below error code at 4.2.5
    // added any errors that may occur during the file upload process to thefront-end
    if (err instanceof multer.MulterError) {
      return res.json({ error: 'File too large! Must be under 1MB' });
    } else if (err) {
      return res.json({ error: err.message });
    }



    const imgPath = req.file.path.replace('public', '');

    const newPersonEntry = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      github_id: req.user.github_id,
      avatar: imgPath,
    };

    const personsAddress = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
    };

    const { rows } = await Person.create(newPersonEntry);

    await Address.create({
      ...personsAddress,
      person_id: rows[0].id,
    });

    req.login(newPersonEntry, () => {
      res.status(200).json({ message: 'Success' });
    });
  });
});




module.exports = router;
