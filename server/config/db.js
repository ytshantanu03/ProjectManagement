const mysql = require('mysql2/promise');

// Create a connection pool
const connectDB = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,       // e.g., 'localhost'
      user: process.env.DB_USER,       // e.g., 'root'
      password: process.env.DB_PASS,   // Your MySQL password
      database: process.env.DB_NAME,   // Your database name
    });

    console.log('MySQL Database Connected...');
    return pool;
  } catch (err) {
    console.error('Database Connection Error: ', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
