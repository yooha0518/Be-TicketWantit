const passport = require('passport');

module.exports = (req, res, next) => {
	console.log('refresh 미들웨어 실행');

	console.log('refresh 인증전략을 사용하여 검사 시작');
	//토큰검증 미들웨어
	passport.authenticate('refresh', { session: false })(req, res, (err) => {
		if (err) {
			console.log('refresh authenticate 에러남');
			res.status(500).send(err.message);
		} else {
			console.log('refresh Authorized');
			next();
		}
	});
};
