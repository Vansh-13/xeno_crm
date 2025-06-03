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

// Convert ES module path for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to MongoDB
connectdb();

// Initialize Express app
const app = express();

// Allowed origins for CORS (update with your frontend URLs)
const allowedOrigins = [
  "http://localhost:5173",
  "https://xeno-crm-frontendd.onrender.com"
];

// CORS setup to allow frontend origins and credentials
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

// Parse JSON bodies
app.use(express.json());

// Session setup (make sure COOKIE_KEY is set in your .env file)
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set true if using HTTPS and proxy (like Render)
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes);

// Serve React static files from the build folder
const reactBuildPath = path.join(__dirname, 'client/dist'); // <-- React build output path

app.use(express.static(reactBuildPath));

// For any other route, serve React's index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
