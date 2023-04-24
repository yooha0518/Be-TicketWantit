const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');

module.exports = () => {
	// jwt strategy 사용
	console.log('passport index.js');
	passport.use(jwtStrategy);
};
