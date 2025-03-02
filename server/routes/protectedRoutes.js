const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/verifyJWT");

router.get("/protected-route", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access granted to protected route", user: req.user });
});

module.exports = router;
