const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/userModels");
const passport = require("passport");


// Configure Passport to use LocalStrategy for authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          email: email,
        });
        const validpass = await bcrypt.compare(password, user.password);
        //  })
        if (user && validpass) {
          return done(null, user);
        } else {
          return done(null, false);
        }
        // Replace this with your actual user authentication logic
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
