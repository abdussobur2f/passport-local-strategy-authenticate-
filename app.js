const express = require("express");
const app = express();
const dotenv = require("dotenv");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
// internel import

const userRouter = require("./routes/userHandler/userRouter");
// user models
const User = require("./models/userModels");

dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");

// conect mongoose with mongdb database
mongoose
  .connect(process.env.MONGDB_CONECTION)
  .then(() => {
    console.log("mongodb conected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", userRouter);

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: process.env.MONGDB_CONECTION,
      collectionName: "session",
    }),
  })
);

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

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

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/profile", (req, res) => {
  res.render("profile");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/", (req, res) => {
  res.render("home");
});

// Since we are using the passport.authenticate() method, we should be redirected no matter what
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: "somethin wrong",
    successRedirect: "/profile",
  }),
  (req, res, next) => {
    if (err) next(err);
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
