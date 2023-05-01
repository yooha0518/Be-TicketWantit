const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');
const refreshJwtStrategy = require('./strategies/refreshJwtStrategy.js');

module.exports = () => {
	// jwt strategy 사용
	console.log('passport index 시작');
	passport.use('access', jwtStrategy);
	passport.use('refresh', refreshJwtStrategy);
};
