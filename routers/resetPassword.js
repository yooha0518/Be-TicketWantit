const { Router } = require('express');
const resetPasswordRouter = Router();
const sendMail = require('../utils/sendMail');
const generateRandomPassword = require('../utils/generateRandomPassword.js');
const hashPassword = require('../utils/hash-password');
const { User } = require('../models');

resetPasswordRouter.post('/', async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res
			.status(400)
			.json({ message: '해당 메일로 가입된 사용자가 없습니다.' });
	}

	const password = generateRandomPassword();

	await User.updateOne(
		{ email },
		{
			password: hashPassword(password),
			isTempPassword: true,
		}
	);
	await sendMail(email, '티켓원잇 임시 비밀번호', `${password}`);
	res.status(200).send(`${email}으로 임시비밀번호를 전송했습니다.`);
});

module.exports = resetPasswordRouter;
