const express = require("express");
const { registerUser , loginUser} = require("../controllers/userController");
const router = express.Router();

// User registration route
router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;
