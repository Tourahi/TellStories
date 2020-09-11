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
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (e) {
    console.log(e);
    res.render('error/500');
  }
});

// @desc  Show/public stories page
// @ met/route GET /
router.get('/', ensureAuth ,async (req , res) => {
  try {
    const stories = await Story.find({ status : 'public' })
    .populate('user')
    .lean();
    res.render('stories/index',{
      stories
    })
  } catch (e) {
    console.log(e);
    res.render('error/500');
  }
  // res.render('stories/index');
});

// @desc  Show/ edit a story page
// @ met/route GET /edit/:id
router.get('/edit/:id', ensureAuth ,async (req , res) => {
  try {
    const story = await Story.findOne({
      _id : req.params.id
    }).lean();
    if(!story){
      return res.render('error/404');
    }
    if (story.user != req.user.id) {
      return res.redirect('/stories');
    }else{
      res.render('stories/edit' ,{
        story,
      });
    }
  } catch (e) {
    console.log(e);
    res.render('error/500');
  }
});

// @desc  Update/Update a story
// @ met/route PUT stories/:id
router.put('/:id', ensureAuth ,async (req , res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if(!story){
      return res.render('error/404');
    }
    if (story.user != req.user.id) {
      return res.redirect('/stories');
    }else{
      story = await Story.findOneAndUpdate(
              { _id : req.params.id },
              req.body,
              {
                new : true,
                runValidators : true,
              });
      res.redirect('/dashboard');
    }
  } catch (e) {
    console.log(e);
    res.render('error/500');
  }
});

// @desc  DELETE/DELETE a story page
// @ met/route DELETE stories/:id
router.delete('/:id', ensureAuth ,async (req , res) => {
  try {
    await Story.remove({ _id : req.params.id });
    res.redirect('/dashboard');
  } catch (e) {
    console.log(e);
    res.render('error/500');
  }
});

module.exports = router;
