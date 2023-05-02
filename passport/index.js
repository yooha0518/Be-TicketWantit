const passport = require('passport');
const accessJwtStrategy = require('./strategies/accessJwtStrategy');
const refreshJwtStrategy = require('./strategies/refreshJwtStrategy');

module.exports = () => {
	// jwt strategy 사용
	console.log('passport index 시작');
	passport.use('access', accessJwtStrategy);
	passport.use('refresh', refreshJwtStrategy);
};
