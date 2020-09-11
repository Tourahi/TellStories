const express = require('express');
const router  = express.Router();
const {ensureAuth}      = require('../middleware/auth.js');

//Models
const Story = require('../models/Story.js');

// @desc  Show/Adding a story page
// @ met/route GET /
router.get('/add', ensureAuth ,(req , res) => {
  res.render('stories/add');
});

// @desc  Add/Adding a story page
// @ met/route POST /
router.post('/', ensureAuth ,async (req , res) => {
  try {
    req.body.userId = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (e) {
    console.log(e);
    res.render('error/500');
  }
});




module.exports = router;
