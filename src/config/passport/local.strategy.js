import passport from "passport";
import { Strategy } from "passport-local";
import { userDao } from "../../persistence/dao/user.dao.js";
import { comparePassword, hashPassword } from "../../utils/hashPassword.js";
import { cartDao } from "../../persistence/dao/cart.dao.js";

// Estrategia de registro

const registerStrategy = new Strategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    try {
      const user = await userService.getOne({ email: username });
      if (user) return done(null, false, { message: "El usuario ya existe" });
      const newCart = await cartServices.createCart();

      const newUser = {
        ...req.body,
        password: hashPassword(password),
        cart: newCart._id,
      };

      const userCreate = await userService.create(newUser);

      return done(null, userCreate);
    } catch (error) {
      done(error);
    }
  }
);


passport.use("register", registerStrategy);



const loginStrategy = new Strategy({ usernameField: "email" }, async (username, password, done) => {
  try {
    const user = await userDao.getOne({ email: username });
    if (!user || !comparePassword( password, user.password))
      return done(null, false, { message: "Email o password no válidos" });

    
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);


passport.use("login", loginStrategy);


passport.serializeUser((user, done) => {
  done(null, user._id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
