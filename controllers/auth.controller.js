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

  const user = new Luser({
    email : req.body.email,
    displayName : req.body.username,
    firstName   : req.body.firstName,
    lastName    : req.body.lastName,
    image       : "", //req.body.image Save the buffer,
    password    : req.body.password
  });
  try {
    await user.save();
  }catch(e)  {
    //TODO
  }
}

// verifyCallback for the passport strategy
authCtrl.verifyCallback = async (username , password , done) => {
  Luser.find({displayName : username})
      .then(async (user) => {
        if(!user) return done(null, false)
        const isValid =  await validPassword(username , password);
        if(isValid) {
          return  done(null, user);
        }else{
          return done(null, false);
        }
      })
      .catch((err) => {
        done(err);
      });
};

authCtrl.loginSuccess = (req , res , next) => {
  //TODO
};

authCtrl.loginFailure = (req , res , next) => {
  //TODO
}

module.exports = authCtrl;
