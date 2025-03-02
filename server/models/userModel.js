const mysql = require("mysql2/promise");

// Create a database connection pool
const db = mysql.createPool({
  host: "VIVEK", // Ensure MySQL server is running on this host
  user: "root", // Verify this username is correct
  password: "root", // Verify this password is correct
  database: "LearningPlatform", // Ensure this database exists
  port: 3307, // Default MySQL port
  waitForConnections: true, // Ensures the pool waits for connections instead of throwing an error
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited queue limit
});

// Create the Users table if it doesn't exist
const createTable = async () => {
  try {
    console.log("Attempting to connect to the database...");
    const connection = await db.getConnection(); // Test the connection
    console.log("Connected to the database successfully!");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Users table created successfully!");

    connection.release(); // Release the connection back to the pool
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused. Ensure the MySQL server is running and the credentials are correct.");
    } else {
      console.error("Error creating Users table:", err);
    }
  }
};

createTable();

module.exports = db;
