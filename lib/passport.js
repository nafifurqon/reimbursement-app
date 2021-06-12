const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Employee } = require("../models");

const authenticate = async (username, password, done) => {
  try {
    const user = await Employee.authenticate({ username, password });

    return done(null, user);
  } catch (error) {
    console.log(error.message);
    return done(null, false, { message: error.message });
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    authenticate
  )
);

passport.serializeUser((user, done) => done(null, user.uuid));

passport.deserializeUser(async (uuid, done) =>
  done(null, await Employee.findByPk(uuid))
);

module.exports = passport;
