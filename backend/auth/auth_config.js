const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/User.model')
const JSON_SECRET = process.env.JSON_SECRET;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JSON_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const user = User.findById(jwtPayload.userId).exec()
        if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
    } catch (err) {
        console.log(err)
    }
  })
);
