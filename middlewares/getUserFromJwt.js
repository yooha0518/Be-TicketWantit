const passport = require('passport');

module.exports = (req, res, next) => {
	console.log('getUserFromJwt 미들웨어 실행');

	if (!req.cookies.token) {
		console.log('req.cookies.token이 없습니다.');
		next();
		return;
	}

	console.log('req.cookies.token이 있습니다.');

	return passport.authenticate('jwt', { session: false })(req, res, next);
};
