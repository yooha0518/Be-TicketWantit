const jwt = require('jsonwebtoken');
const env = require('../.env');

exports.createAccessJwt = (user) => {
	const accessPayload = {
		shortId: user.shortId,
		name: user.name,
		email: user.email,
		profileImage: user.profileImage,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const accessOptions = { algorithm: 'HS256', expiresIn: '1h' }; //토큰 만료시간(1시간)
	const accessToken = jwt.sign(accessPayload, env.ACCESSSECRET, accessOptions);
	console.log('토큰 만들기 완료');
	return { accessToken };
};
