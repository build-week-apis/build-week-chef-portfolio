const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET || 'testing';

function authenticate(req, res, next) {
	const token = req.get('Authorization');

	if (token) {
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err) return res.status(401).json(err);

			req.decoded = decoded;

			next();
		});
	} else {
		return res.status(401).json({
			error : 'No token provided, must be set on the Authorization Header',
		});
	}
}

function generateToken(user) {
	const payload = {
		sub      : user.id,
		username : user.username,
	};

	const options = {
		expiresIn : '7d',
	};

	return jwt.sign(payload, jwtKey, options);
}

module.exports = {
	authenticate,
	generateToken,
};
