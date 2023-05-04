const { Router } = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const { userController } = require('../controller');
const userRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const resetPassword = require('./resetPassword');
const changePassword = require('./changePassword');
const postProfileImage = require('./postProfileImage');
const emailAuth = require('../utils/emailAuth');

//사용자 추가
userRouter.post('/', userController.postUser, (req, res) => {
	const { email, password } = req.body;
	console.log('로그인 시작');
	axios
		.post('localhost:5000/api/auth', { email, password })
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

//사용자 프로필사진 추가
const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, 'public/');
		},
		filename(req, file, callback) {
			const extension = file.originalname.split('.').pop();
			callback(null, req.user.shortId + '.' + extension);
		},
	}),
});

userRouter.use(
	'/profileImage',
	getUserFromJwt,
	upload.single('profileImage'),
	postProfileImage
);

//사용자 비밀번호 변경
userRouter.use('/change-password', getUserFromJwt, changePassword);

//이메일 본인인증
userRouter.use('/emailAuth', emailAuth);

module.exports = userRouter;

// 관리자 계정
// dbsdnwjd96@naver.com
// 1234!@#$
