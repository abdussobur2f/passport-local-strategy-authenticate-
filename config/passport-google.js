const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModels");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "136849048277-i57qb556au5596javatvfd1es9kfsdm7.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5173/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({ googleId: profile.id });

      try {
        if (!user) {
          let newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
          });
          newUser.save();
          return cb(null, newUser);
        } else {
          // if we find an user just return return user
          return cb(null, user);
        }
      } catch (error) {
        if (error) {
          return cb(err, null);
        }
      }

      // not a user; so create a new user with new google id
    }
  )
);

// create session id
// whenever we login it creares user id inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
