const Joi = require('@hapi/joi');

const RegisterValidationSch = Joi.object({
  //displayName , firstName , lastName , image
  displayName : Joi.string()
                   .min(6)
                   .alphanum()
                   .required(),
  firstName :Joi.string()
                   .min(6)
                   .alphanum()
                   .required(),
  lastName :  Joi.string()
                   .min(6)
                   .alphanum()
                   .required(),
  email : Joi.string().min(6).required().email(),
  password : Joi.string().min(6).required(),
});

const LoginValidationSch = Joi.object({
  email : Joi.string().min(6).required().email(),
  password : Joi.string().min(6).required(),
});

module.exports = {
  RegisterValidationSch,
  LoginValidationSch
}
