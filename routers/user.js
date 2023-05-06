const { Router } = require('express');
const { userController } = require('../controller');
const userRouter = Router();
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const upload = require('../utils/upload.js');

//사용자 추가 + 자동 로그인
userRouter.post('/', userController.postUser, userController.authUser);

//사용자 정보 조회
userRouter.get('/', getUserFromJwt, userController.getUser);

//사용자 정보 수정
userRouter.put('/', getUserFromJwt, userController.putUser);

//사용자 계정 휴면
userRouter.delete('/', getUserFromJwt, userController.deleteUser);

//사용자 비밀번호 초기화
userRouter.post('/reset-password',  userController.resetPassword);

//사용자 프로필사진 추가
userRouter.post(
	'/profileImage',
	getUserFromJwt,
	upload.single('profileImage'),
	userController.putProfileImage
);

//사용자 비밀번호 변경
userRouter.post('/change-password', getUserFromJwt, userController.putPassword);

//이메일 본인인증
userRouter.post('/emailAuth', userController.getUser);

//사용자 진짜 삭제
userRouter.delete('/:shortId', userController.realDeleteUser);

module.exports = userRouter;
