const { Router } = require('express');
const emailAuthRouter = Router();
const sendMail = require('./sendMail');
const { User } = require('../models');
const generateRandomPassword = require('./generateRandomPassword.js');
const { setAuthCodeToken } = require('./setAuthcodeToken');

emailAuthRouter.get('/', (req, res) => {
	res.send('emailAuth api test');
});

emailAuthRouter.post('/', async (req, res) => {
	console.log('emailAuth 시작');
	const { email } = req.body;
	console.log('email:', email);
	const user = await User.findOne({ email });

	if (user) {
		if (!user.state) {
			res.status(400).json({ message: '탈퇴한 계정입니다.' });
		}
		return res
			.status(400)
			.json({ message: '이미 해당 메일로 가입된 사용자가 있습니다.' });
	} else {
		const authCode = generateRandomPassword();
		await sendMail(email, `티켓원잇 인증번호`, `${authCode}`);
		console.log('토큰 만들기 실행');
		res.send(setAuthCodeToken(authCode));
	}
});

module.exports = emailAuthRouter;
