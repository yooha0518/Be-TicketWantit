const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');

module.exports = () => {
	// jwt strategy 사용
	console.log('passport index 시작');
	passport.use(jwtStrategy);
};
