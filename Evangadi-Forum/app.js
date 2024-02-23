const express = require("express");

const port = 3300;

const app = express();

//  routes middleware file
const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware ??

// answer routes middleware ??

app.listen(port, () => {
	console.log(`app listening on port ${port}!`);
});
