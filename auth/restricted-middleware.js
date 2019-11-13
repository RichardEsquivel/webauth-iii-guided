const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;


	if (token) {
		//check that the token is valid

		const secret = process.env.JWT_SECRET || 'super love with!';

		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				//bad value, token has been altered
				res.status(401).json({ message: 'Invalid Credentials!' })
			} else {
				req.decodedJwt = decodedToken;
				next();
			}
		})
		//after token is decoded you can have next functions utilize that data and make decisions based on that

	} else {
		res.status(400).json({ message: 'No credentials provided' });
	}
};


//can a user have more than one role

//can a role be assigned to more than one user?

