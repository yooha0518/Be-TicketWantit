const { Router } = require('express');
const { userController } = require('../controller');
const userRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const generateRandomPassword = require('../utils/generateRandomPassword.js');
const resetPassword = require('./resetPassword.js');
const changePassword = require('./changePassword.js');
const sendMail = require('../utils/sendMail');
const axios = require('axios');

//사용자 추가
userRouter.post('/', userController.postUser, (req, res) => {
	const { email, password } = req.body;
	console.log('로그인 시작');
	axios
		.post('http://34.64.112.166/api/auth', { email, password })
		.then((postRes) => {
			console.log(postRes);
			res.send(postRes.data);
		})
		.catch((error) => {
			console.error(error);
		});
});

async function authEmail() {
	const { email } = req.body;
	const authNum = generateRandomPassword();

	await sendMail(
		email,
		`티켓원잇 인증번호`,
		`티켓원잇의 인증번호 입니다. "${authNum}"`
	);
}

//사용자 정보 조회
userRouter.get('/', getUserFromJwt, userController.getUser);

//사용자 정보 수정
userRouter.put('/', getUserFromJwt, userController.putUser);

//사용자 정보 삭제
userRouter.delete('/', getUserFromJwt, userController.deleteUser);

//사용자 비밀번호 초기화
userRouter.use('/reset-password', resetPassword);

//사용자 비밀번호 변경
userRouter.use('/change-password', getUserFromJwt, changePassword);

module.exports = userRouter;
