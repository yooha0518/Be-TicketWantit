const { Router } = require('express');
const { userController } = require('../controller');
const userRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const resetPassword = require('./resetPassword.js');
const changePassword = require('./changePassword.js');
const axios = require('axios');
const emailAuth = require('../utils/emailAuth');

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

//이메일 본인인증
userRouter.use('/emailAuth', emailAuth);

module.exports = userRouter;
