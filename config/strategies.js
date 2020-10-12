const Fuser = require('../models/ForeignUser');

const authStrategies = {};

authStrategies.google = async (accessToken,refreshToken,profile,done) => {
  console.log(profile);
  const newUser = {
    googleId    : profile.id,
    displayName : profile.displayName,
    firstName   : profile.name.familyName,
    lastName    : profile.name.givenName,
    image       : profile.photos[0].value,
  };

  try {
    let user = await Fuser.findOne({ googleId :  profile.id});
    if (user) {
      done(null , user);
    }
    else {
      user = Fuser.create(newUser);
      done(null , user);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = authStrategies;
