const Fuser = require('../models/LocalUser.js');
const bcrypt = require('bcryptjs');

const validPassword = async (email, password) => {
  const user = await Fuser.findOne({email , password});
  const ivalid = await bcrypt.compare(password , user.password);
  if(!isvalid) return false;
  return true;
};

module.exports = {
  validPassword
}
