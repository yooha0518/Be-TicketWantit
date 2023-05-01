const jwt = require('jsonwebtoken');

const secret = 'ftzvi1pzHgaox63F9jYP5eCEMdbFlWjBDzPTVOu9ZgcY2vxS1';

exports.secret = secret;

exports.setUserToken = (user) => {
	const payload = {
		shortId: user.shortId,
		name: user.name,
		email:user.email,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const options = { algorithm: 'HS256', expiresIn: '1h' }; //토큰 만료시간(1시간)
	console.log('토큰 만들기 완료');
	return jwt.sign(payload, secret, options); // 유저 jwt 토큰생성
};
