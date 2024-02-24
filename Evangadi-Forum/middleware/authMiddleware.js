const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			msg: "Autinitication invalid",
		});
	}
	const token = authHeader.split(" ")[1];
	// console.log(authHeader, token);
	try {
		const { username, userid } = jwt.verify(token, "secret");
		req.user = { username, userid };
		next();
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			msg: "Autinitication invalid",
		});
	}
};

module.exports = authMiddleware;
