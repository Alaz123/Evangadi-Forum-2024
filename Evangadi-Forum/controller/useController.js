const register = (req, res) => {
	res.end("user created");
};
const login = (req, res) => {
	res.end("user-login");
};
const checkUser = (req, res) => {
	res.end("user-check");
};
module.exports = { register, login, checkUser };
