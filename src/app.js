import espress from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from './routes/router.js';
import { connectDB } from "./config/db.js";
// import dotenv from "dotenv";


const app = espress();
// dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(espress.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 500000 }, 
}));

app.use("/api", routes);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
});

