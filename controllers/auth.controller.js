const Luser = require('../models/LocalUser.js');
const bcrypt = require('bcryptjs');
const validPassword = require('../lib/passwordUtils.js').validPassword;

//Validation
const {
  RegisterValidationSch,
  LoginValidationSch
} = require('../models/validations/userValid.js');

const authCtrl = {};

authCtrl.registerCtrl = async (req , res) => {
  //validations
  const {error} = RegisterValidationSch.validate(req.body);
  // TODO return an error message so the page catch
  if(error) return res.status(400).send({err : error.details[0].message});

  const salt  = await bcrypt.genSalt(10);
  // Still need to parse the body
  const hashedPass = await bcrypt.hash(req.body.password , salt);
  const displayName = req.body.username;
  const user = new Luser({
    displayName : displayName,
    firstName   : req.body.firstName,
    lastName    : req.body.lastName,
    image       : "", //req.body.image Save the buffer,
    password    : req.body.password,
    email       : req.body.email
  });
  try {
    await user.save();
    return res.status(200).json(user);
  }catch(e)  {
    es.status.send(400).json({err : "Did not register."});
  }
}

authCtrl.loginSuccess = (req , res , next) => {
  res.status(200).json({ user : req.user});
};

authCtrl.loginFailure = (req , res , next) => {
  res.status(400).json({ err : 'You are not Authenticated'});
}

module.exports = authCtrl;
