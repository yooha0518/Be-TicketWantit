const jwt = require('jsonwebtoken');

const secret = 'yoohayoung';

exports.secret = secret;

exports.setUserToken = (user) => {
	const payload = {
		shortId: user.shortId,
		name: user.name,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const options = { algorithm: 'HS256', expiresIn: '1h' }; //토큰 만료시간(1시간)
	console.log('토큰 만들기 완료');
	return jwt.sign(payload, secret, options); // 유저 jwt 토큰생성
};
