import express from "express";
import passport from "passport";
const router = express.Router();
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});
router.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"]
}));


router.get('/google/callback', passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login"
}), (req, res) => {
     res.redirect("http://localhost:5173/dashboard");
});


router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect("http://localhost:5173");
    });
});


export default router;
