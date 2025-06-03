import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";  
import authRoutes from './routes/authRoute.js';
import customerRoutes from './routes/customerRoute.js';
import campaignRoutes from './routes/campaignRoute.js';
import orderRoutes from './routes/orderRoute.js';
import connectdb from "./db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

connectdb();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_KEY,  
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,  
      maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
