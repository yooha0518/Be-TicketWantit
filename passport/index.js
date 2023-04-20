const passport = require('passport');
const local = require('./strategies/local');
const jwt = require('./strategies/jwt');

module.exports = () => {
  passport.use(local);
  
	// jwt strategy 사용
	passport.use(jwt);

  //<-- local strategy 사용 X -->
  // passport.serializeUser((user, callback) => {
  //   callback(null, user);
  // });

  // passport.deserializeUser((obj, callback) => {
  //   callback(null, obj);
  // });
  //<-- //local strategy 사용 X -->
};