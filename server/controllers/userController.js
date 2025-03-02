const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/userModel");

// User Registration API
const registerUser = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required, including role." });
    }

    // Validate the role
    const validRoles = ["Admin", "Student", "Instructor"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role provided." });
    }

    // Check if the user already exists
    const [existingUser] = await db.query("SELECT * FROM Users WHERE Email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the Users table
    const userResult = await db.query(
      "INSERT INTO Users (Full_Name, Email, Password_Hash, Is_Active) VALUES (?, ?, ?, ?)",
      [full_name, email, hashedPassword, true]
    );

    const userId = userResult[0].insertId; // Get the newly inserted user's ID

    // Insert the role into the User_Roles table
    await db.query(
      "INSERT INTO User_Roles (User_ID, Role) VALUES (?, ?)",
      [userId, role]
    );

    // Generate a JWT token
    const token = jwt.sign({ id: userId, email, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: userId,
        fullName: full_name,
        email,
        role,
      },
    });
  } catch (err) {
    console.error("Error in user registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser };


// User Login API
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists in the database
    const [userRows] = await db.query("SELECT * FROM Users WHERE Email = ?", [email]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = userRows[0];

    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.Password_Hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.User_ID, email: user.Email, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token and user info (excluding password)
    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.User_ID,
        fullName: user.Full_Name,
        email: user.Email,
        role: user.Role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { registerUser, loginUser };
