// const { Router } = require('express');
// const emailAuthRouter = Router();
// const sendMail = require('./sendMail');
// const { User } = require('../models');
// const generateRandomPassword = require('./generateRandomPassword.js');
// const { setAuthCodeToken } = require('./setAuthcodeToken');


// emailAuthRouter.post('/', async (req, res) => {
// 	const { email } = req.body;
// 	const user = userService.awaitgetUserFromEmail(email);

// 	if (user) {
// 		if (!user.state) {
// 			res.status(400).json({ message: '탈퇴한 계정입니다.' });
// 		}
// 		return res
// 			.status(400)
// 			.json({ message: '해당 메일은 이미 가입되어 있습니다.' });
// 	} else {
// 		const authCode = generateRandomPassword();
// 		await sendMail(email, `티켓원잇 인증번호`, `${authCode}`);
// 		console.log('토큰 만들기 실행');
// 		res.send(setAuthCodeToken(authCode));
// 	}
// });

// module.exports = emailAuthRouter;
