
var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
var Schema = mongoose.Schema


var UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true
  },
  facebookProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  twitterProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  googleProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  }
})

UserSchema.statics.findOrCreateFbUser = function (accessToken, refreshToken, profile, cb) {
  var that = this
  return this.findOne({
    'facebookProvider.id': profile.id
  }, function (err, user) {
    if (!user) {
      var newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken
        }
      })

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error)
        }
        return cb(error, savedUser)
      })
    } else {
      return cb(err, user)
    }
  })
}

UserSchema.statics.findOrCreateGoogleUser = function (accessToken, refreshToken, profile, cb) {
  var that = this
  return this.findOne({
    'googleProvider.id': profile.id
  }, function (err, user) {
    // no user was found, lets create a new one
    if (!user) {
      var newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken
        }
      })

      newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error)
        }
        return cb(error, savedUser)
      })
    } else {
      return cb(err, user)
    }
  })
}

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.APP_SECRET, { expiresIn: '7d' })
}

module.exports = mongoose.model('User', UserSchema)
