const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole(['student']), (req, res) => { //can add an array of roles
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

function checkRole(role) {
	return function (req, res, next) {
		if (role.includes(req.decodedJwt.role)) {
			next();
		} else {
			res.status(403).json({ message: "No authorization to admin role." })
		}
	}
}


module.exports = router;
