const express = require('express');
const router  = express.Router();
const {ensureAuth , keepGest}      = require('../middleware/auth.js');

//Models
const Story = require('../models/Story.js');

// @desc  Login/Landing page
// @ met/route GET /
router.get('/' , keepGest ,(req , res) => {
  res.render('login' , { layout : 'login'});
});

// @desc  Dashboard
// @ met/route GET /dashboard
router.get('/dashboard' ,ensureAuth ,async (req , res) => {
  try {
    const stories = await Story.find({ userId : req.user.id }).lean(); //lean to get JSON form of the mongoose obj
    res.render('dashboard' , {
      name : req.user.firstName,
      stories
    });
  } catch (err) {
    res.render('error/500');
  }
});


module.exports = router;
