const express = require("express");

const port = 3300;

const dbConnection = require("./DB/dbconfig");

const app = express();

//  routes middleware file
const userRoutes = require("./routes/userRoute");
app.use(express.json()); // parse requests of content-type - application/json)

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware ??

// answer routes middleware ??

// query statement
(async () => {
	try {
		const result = await dbConnection.execute("SELECT 'test' ");
		// console.log(result)
		await app.listen(port);
		console.log(`Server is running on http://localhost:${port}`);
	} catch (error) {
		console.log(error.message);
	}
})();
