import { config } from "dotenv";
import argumnts from "./argumnts.js";


const { mode } = argumnts;

const path = ".env." + mode;
config({ path });

const env = {
    PORT: process.env.PORT ,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_PASS: process.env.EMAIL_PASS, 
    EMAIL: process.env.EMAIL,
};

export default env;