const express = require("express");
const app = express();
const dotenv = require("dotenv");

// const passport = require("passport");

// const session = require("express-session");/
const mongoose = require("mongoose");
// const mongoStore = require("connect-mongo");

// internel import

const userRouter = require("./routes/userHandler/userRouter");
const loginRouter = require("./routes/loginHandler/userLoginHandler");
// user models

// require("./config/passport-google")

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
app.use("/loginRouter" , loginRouter);

// Configure session middleware
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//     store: mongoStore.create({
//       mongoUrl: process.env.MONGDB_CONECTION,
//       collectionName: "session",
//     }),
//   })
// );

// Initialize Passport and restore authentication state from session
// app.use(passport.initialize());
// app.use(passport.session());

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

// passport google auth

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//     successRedirect: "/",
//   }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );



// // Since we are using the passport.authenticate() method, we should be redirected no matter what
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureMessage: "somethin wrong",
//     successRedirect: "/profile",
//   }),
//   (req, res, next) => {
//     if (err) next(err);
//   }
// );

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
