const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authStrategies     = require('./strategies.js');
const Fuser = require('../models/ForeignUser');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  //Google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },authStrategies.google));

  //Local
  const strategy  = new LocalStrategy(authStrategies.verifyCallback);
  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Fuser.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
