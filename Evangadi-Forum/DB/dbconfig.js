const mysql = require("mysql2");

// Create a connection pool
const dbConnection = mysql.createPool({
	host: "localhost",
	user: "evangadi-admin",
	password: "s5LU9iF1wy1dnr5",
	database: "evangadi_db",
	connectionLimit: 10,
});

// Execute a SQL query
dbConnection.execute("SELECT 'test' ", (err, result) => {
	if (err) {
		console.error("Error executing the query:", err.message);
	} else {
		console.log("Query result:", result);
	}
});

// Close the connection pool when done
// dbConnection.end();
