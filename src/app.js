import "./helpers/envs.js";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from "./routes/api/router.js";
import { connectDB } from "./config/db.js";
import passport from "./config/passport/passport.config.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import { usuariosMockRouter } from "./routes/mocks.route.js";
import logger from "./helpers/logger.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 500000 },
  })
);

app.use(passport.initialize());

app.use("/api", routes);
app.use("/api/mocks", usuariosMockRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.INFO("Server is running on port " + PORT);
  connectDB();
});
