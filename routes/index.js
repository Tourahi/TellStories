const express = require('express');
const router  = express.Router();

// @desc  Login/Landing page
// @ met/route GET /
router.get('/' , (req , res) => {
  res.render('login' , { layout : 'login'});
});

// @desc  Dashboard
// @ met/route GET /dashboard
router.get('/dashboard' , (req , res) => {
  res.render('dashboard');
});


module.exports = router;
