const jwt = require('jsonwebtoken');

const accessSecret = 'ftzvi1pzHgaox63F9jYP5eCEMdbFlWjBDzPTVOu9ZgcY2vxS1';
const refreshSecret = 'djfkslsegjsldkjiclskdnwna;eidjsEisIdSaAgsdwe';
exports.accessSecret = accessSecret;
exports.refreshSecret = refreshSecret;

exports.setUserToken = (user) => {
	const payload = {
		shortId: user.shortId,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const options = { algorithm: 'HS256', expiresIn: '1h' }; //토큰 만료시간(1시간)
	console.log('토큰 만들기 완료');
	const accessToken = jwt.sign(payload, accessSecret, options); // 유저 jwt 토큰생성
	const refreshToken = jwt.sign(payload, refreshSecret, options); // 유저 jwt refresh 토큰생성

	return { accessToken, refreshToken };
};
