const Luser  = require('../models/LocalUser.js');
const Fuser  = require('../models/ForeignUser.js');
const bcrypt = require('bcryptjs');

const IsUserAlreadyExisting = async (req,res,next) => {
  const emailExist    = await Luser.findOne({email : req.body.email})
                        || await Fuser.findOne({email : req.body.email});
  const usernameExist = await Luser.findOne({ displayName : req.body.username })
                        || await Fuser.findOne({ displayName : req.body.username });
  if(emailExist || usernameExist){
    return res.status(400).json({err : "User already exist."});
  }
  next();
};

const IsUserExisting = async (req , res , next) => {
  if(req.body.email) {
    const emailExist = await Luser.findOne({ email : req.body.email });
    if(!emailExist) return res.status(400).json({err : "email incorrect."});
  }
  if(req.body.username) {
    const usernameExist = await Luser.findOne({displayName : req.body.username});
    if(!usernameExist) return res.status(400).json({err : "username incorrect."});
  }
  next();
};

const checkPassword = async (req,res,next) => {
  const user = await Luser.findOne({displayName : req.body.username});
  const isPassValid = await bcrypt.compare(req.body.password , user.password);
  if(!isPassValid) return res.status(400).json({err : "incorrect password."})
}

//@Desc ensure that the unauthenticated user stays at (/)
const ensureAuth = (req , res , next) => {
  if(req.isAuthenticated()) {
    return next();
  }else{
    res.redirect('/');
  }
}

const keepGest = (req , res , next) => {
  if(req.isAuthenticated()) {
    res.redirect('/dashboard');
  }else{
    return next();
  }
}

module.exports = {
  IsUserExisting,
  IsUserAlreadyExisting,
  checkPassword,
  ensureAuth,
  keepGest
}
