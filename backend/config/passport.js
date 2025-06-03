import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// in this is use the type=module so in this first i have cinvert url to the file name so that path.join is work in this

dotenv.config({ path: path.join(__dirname, "../.env") }); 
// Make sure path sahi hai — agar aapka .env root folder mein hai toh ../.env sahi hai

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleID: profile.id });

    if (!user) {
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleID: profile.id,
        profilePic: profile.photos[0].value
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
