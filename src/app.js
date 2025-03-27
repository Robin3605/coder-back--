import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from "./routes/router.js";
import { connectDB } from "./config/db.js";
import passport from "./config/passport/passport.config.js";

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

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
