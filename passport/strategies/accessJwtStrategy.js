const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const env = require('../../.env');
const { User } = require('../../models/index.js');

const jwtOptions = {
	secretOrKey: env.ACCESSSECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const accessJwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findOne({ shortId: payload.shortId })
		.then((user) => {
			if (user) {
				return done(null, user);
			} else {
				console.log('user가 없습니다.');
				return done(null, false);
			}
		})
		.catch((err) => {
			console.log('실패');
			done(err, false);
		});
});

module.exports = accessJwtStrategy;
