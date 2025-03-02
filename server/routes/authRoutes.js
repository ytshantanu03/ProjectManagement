const express = require("express");
const passport = require("passport");
const router = express.Router();

// Redirect user to Google for authentication
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback after Google authenticates the user
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login", // Redirect to login on failure
        successRedirect: "/", // Redirect to dashboard on success
    })
);

module.exports = router;
