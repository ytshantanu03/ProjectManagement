const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Replace with your Google client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Replace with your Google client secret
            callbackURL: "http://localhost:5000/auth/google/callback", // Update with your callback URL
            scope: ["profile", "email"], // Add scope for profile and email access
        },

        (accessToken, refreshToken, profile, done) => {
            // Process the user profile here
            console.log(profile);
            return done(null, profile);
        }
    )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
