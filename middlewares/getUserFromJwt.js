const passport = require('passport');

module.exports = (req, res, next) => {
	console.log('getUserFromJwt 미들웨어 실행');

	console.log('인증전략을 사용하여 검사 시작');
	//토큰검증 미들웨어
	passport.authenticate('access', { session: false })(req, res, (err) => {
		if (err) {
			console.log('authenticate 에러남');
			res.status(500).send(err.message);
		} else {
			console.log('Authorized');
			next();
		}
	});
};
