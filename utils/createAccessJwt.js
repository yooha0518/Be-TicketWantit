const jwt = require('jsonwebtoken');

const accessSecret = 'ftzvi1pzHgaox63F9jYP5eCEMdbFlWjBDzPTVOu9ZgcY2vxS1';
exports.accessSecret = accessSecret;

exports.createAccessJwt = (user) => {
	const accessPayload = {
		shortId: user.shortId,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const accessOptions = { algorithm: 'HS256', expiresIn: '1h' }; //토큰 만료시간(1시간)
	console.log('토큰 만들기 완료');
	const accessToken = jwt.sign(accessPayload, accessSecret, accessOptions); // 유저 jwt 토큰생성

	return { accessToken };
};
