const jwt = require('jsonwebtoken');

const secret = 'yoohayoung';
exports.secret = secret;

exports.setAuthCodeToken = (authCode) => {
	const payload = {
		authCode: authCode,
	};
	const options = { algorithm: 'HS256', expiresIn: '3m' }; //토큰 만료시간(1시간)
	console.log('토큰 만들기 완료');
	return jwt.sign(payload, secret, options); // 유저 jwt 토큰생성
};
