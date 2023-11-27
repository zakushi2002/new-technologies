require("dotenv").config();
const https = require("https");
const path = require("path");
const express = require("express");
const fs = require("fs");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const session = require("express-session");

const app = express();
const PORT = 5000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  scope: ["profile", "email"],
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log("Google profile", profile);
  done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

app.use(helmet());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    key: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

const checkLoggedIn = (req, res, next) => {
  console.log("Current User", req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must be logged in to access this resource",
    });
  }
  next();
};

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (res, req) => {
    console.log("Logged in");
  }
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    console.log("Google callback");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    console.log("Logged out");
  });
  res.redirect("/");
});

app.get("failure", (req, res) => {
  res.send("Failed to login");
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send("This is a secret page");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}\nhttps://localhost:${PORT}`);
  });
