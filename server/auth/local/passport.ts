let passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';

function localAuthenticate(User, email, password, done) {
  User.findOne({ email: email.toLowerCase() }).exec()
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      } else if (!user.active) {
        return done(null, false, {
          message: 'This user is inactive.'
        });
      }
      user.authenticate(password, function (authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is incorrect.' });
        } else {
          // let returnUser = { _id: user._id, name: user.name, email: user.email, active: user.active, provider: user.provider, role: user.role }
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

export function setup(User/*, config*/) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
