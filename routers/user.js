const { Router } = require('express');
const { User } = require('../models');
const { userController } = require('../controller');
const userRouter = Router();

const sendMail = require('../utils/sendMail');
const generateRandomPassword = require('../utils/generateRandomPassword');
const hashPassword = require('../utils/hash-password');

//사용자 추가
userRouter.post('/', userController.postUser);

//사용자 정보 조회
userRouter.get('/', userController.getUser);

//사용자 정보 수정
userRouter.put('/', userController.putUser);

//사용자 정보 삭제
userRouter.delete('/', userController.deleteUser);

userRouter.get('/send-message', (req, res) => {
	res.send('email을 넣어서 post요청해주세요');
});

userRouter.post('/reset-password', async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('해당 메일로 가입된 사용자가 없습니다.');
	}

	const password = generateRandomPassword();

	await User.updateOne(
		{ email },
		{
			password: hashPassword(password),
		}
	);
	await sendMail(
		email,
		'티켓원잇 임시 비밀번호',
		`티켓원잇의 임시 비밀번호입니다. "${password}" 로그인 후에 비밀번호를 변경해주세요.`
	);
	res.status(200).send(`${email}으로 임시비밀번호를 전송했습니다.`);
});

userRouter.post('/change-password', async (req, res) => {
	const { currentPassword, password } = req.body;
	const user = await User.findOne({ shortId: req.user.shortId });

	if (user.password !== hashPassword(currentPassword)) {
		throw new Error('임시 비밀번호가 일치하지 않습니다.');
	}

	await User.updateOne(
		{ shortId: user.shortId },
		{
			password: hashPassword(password),
			passwordReset: false,
		}
	);

	res.stat('200').send('비밀번호 변경완료 로그인페이지로 랜더링');
});

module.exports = userRouter;
