let passport = require('passport');
import { Strategy as TwitterStrategy } from 'passport-twitter';

export function setup(User, config) {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_ID,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: `${process.env.DOMAIN || ''}/auth/twitter/callback`
  },
    function (token, tokenSecret, profile, done) {
      profile._json.id = `${profile._json.id}`;
      profile.id = `${profile.id}`;

      User.findOne({ 'twitter.id': profile.id }).exec()
        .then(user => {
          if (user) {
            return done(null, user);
          }

          user = new User({
            name: profile.displayName,
            username: profile.username,
            avatar: profile.photos[0].value,
            role: 'user',
            provider: 'twitter',
            twitter: profile._json
          });
          user.save()
            .then(savedUser => done(null, savedUser))
            .catch(err => done(err));
        })
        .catch(err => done(err));
    }));
}
