const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Only allow requests from this origin
    methods: ["GET", "POST"], // Only allow GET and POST requests
  }));

// User routes
app.use("/api/users", userRoutes);

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use(authRoutes);
app.use("/api/auth", authRoutes);

//protected routes

const protectedRoutes = require("./routes/protectedRoutes");
app.use("/api/protected", protectedRoutes);


const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // Include passport configuration

app.use(
    session({
        secret: "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", // Change this to a secure key
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
