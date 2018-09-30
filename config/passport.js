const passport = require('passport')
const User = require('./../models/User')

const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = () => {
  passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    User.findOrCreateFbUser(accessToken, refreshToken, profile, (err, user) => {
      return done(err, user);
    });
  }));

  passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    User.findOrCreateGoogleUser(accessToken, refreshToken, profile, (err, user) => {
      return done(err, user);
    });
  }));
}
