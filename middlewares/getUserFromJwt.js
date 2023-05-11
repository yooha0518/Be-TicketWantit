const passport = require('passport');

module.exports = (req, res, next) => {
	//토큰검증 미들웨어
	passport.authenticate('access', { session: false })(req, res, (err) => {
		if (err) {
			console.log('authenticate 에러');
			res.status(500).send(err.message);
		} else {
			console.log('Authorized');
			next();
		}
	});
};
