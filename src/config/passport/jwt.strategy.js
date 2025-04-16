import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { userDao } from "../../persistence/dao/user.dao.js";

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies.token;
  }

  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    cookieExtractor,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    if (payload) {
      const user = await userDao.getOne({ email: payload.email });
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
