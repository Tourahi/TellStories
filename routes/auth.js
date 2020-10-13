const express   = require('express');
const router    = express.Router();
const passport  = require('passport');

// @desc  Auth whit google
// @met/route GET /auth/google
router.get('/google' , passport.authenticate('google' , { scope : ['profile']}));

// @desc  google auth callback
// @met/route GET /auth/google/dashboard
router.get('/google/callback' , passport.authenticate('google' , {
  failureRedirect : '/'
}) , (req , res) => {
  res.redirect('/dashboard');
});

//Local Authentication
// const {
//
// } = require('');


// @desc  Logout user
// @met/route GET /auth/logout
router.get('/logout' , (req , res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
