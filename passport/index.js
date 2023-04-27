const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');

module.exports = () => {
	// jwt strategy 사용
	passport.use(jwtStrategy);
};
