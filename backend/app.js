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

// Convert ES module path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to MongoDB
connectdb();

// Initialize Express app
const app = express();

// ✅ CORS Configuration for both local and production
const allowedOrigins = [
  "http://localhost:5173",
  "https://xeno-crm-frontendd.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// Session setup
app.use(session({
  secret: process.env.COOKIE_KEY, // ✅ Make sure COOKIE_KEY is set in .env
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS and proxy (e.g., with Render)
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
