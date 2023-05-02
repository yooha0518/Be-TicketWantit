const jwt = require('jsonwebtoken');
const env = require('../.env');

exports.setUserToken = (user) => {
	const accessPayload = {
		shortId: user.shortId,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const refreshPayload = {
		shortId: user.shortId,
	};
	const accessOptions = { algorithm: 'HS256', expiresIn: '1h' }; 
	const refreshOptions = { algorithm: 'HS256', expiresIn: '7d' }; 
	
	const accessToken = jwt.sign(accessPayload, env.ACCESSSECRET, accessOptions);
	const refreshToken = jwt.sign(refreshPayload,env.REFRESHSECRET,refreshOptions);
	
	console.log('토큰 만들기 완료');
	return { accessToken, refreshToken };
};
