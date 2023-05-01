const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
module.exports = async(token) => {
	try {
		console.log('decodeJwt 미들웨어 실행');

		const { payload } = jwt.decode(token, { complete: true });
		const { shortId } = payload;
		console.log('shortId:', shortId);

        const user = await User.findOne({ shortId });
        req.user = user;
        next();
	} catch (e) {
		console.log('Invalid token:', e.message);
	}
};
