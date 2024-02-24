const dbConnection = require("../DB/dbconfig");
// console.log(dbConnection)
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const { username, firstname, lastname, email, password } = req.body;
	if (!firstname || !lastname || !username || !email || !password) {
		res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please provide all required information" });
	}

	try {
		const [user] = await dbConnection.query(
			"SELECT username, userid FROM users where username = ? or email =? ",
			[username, email]
		);

		if (user.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "user already registered" });
		}
		if (password.length < 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "password must be at least 8 characters" });
		}

		// encrypt the password before saving it to database
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		await dbConnection.query(
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?,?, ?, ?) ",
			[username, firstname, lastname, email, hashedPassword]
		);
		return res.status(StatusCodes.CREATED).json({
			msg: "user registered successfully",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			msg: "some  thing went wrong please try again later!!!",
		});
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "please enter all required fields" });
	}

	try {
		const [user] = await dbConnection.query(
			"select username, userid, password from users where email = ? ",
			[email]
		);
		if (user.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "email not registered frist please create account!!" });
		}

		// check password is correct
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "wrong password Try Again!!!" });
		}
		const userid = user[0].userid;
		const username = user[0].username;
		const token = jwt.sign({ username, userid }, "secret", { expiresIn: "1d" });
		return res.status(StatusCodes.OK).json({
			user: user,
			msg: "succesfuuly login by this account!!",
			token: token,
		});
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something went wrong, try again later!" });
	}
};

const checkUser = async (req, res) => {

const username= req.user.username
const userid= req.user.userid

	res.status(StatusCodes.OK).json(
		{
            username: username,
			userid: userid,
			msg:"vaild user!!!"
        }
	)


	
};

module.exports = { register, login, checkUser };
