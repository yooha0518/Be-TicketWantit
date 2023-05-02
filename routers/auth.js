const { Router } = require('express');
const passport = require('passport');
const { User } = require('../models/index');
const { setUserToken } = require('../utils/createjwt');
const getUserFromJwt = require('../middlewares/getUserFromJwt');
const refreshToken = require('../middlewares/getUserFromRefreshJwt');
const hashPassword = require('../utils/hash-password');
const authRouter = Router();
const logoutRouter = require('./logout');
const { createAccessJwt } = require('../utils/createAccessJwt');

authRouter.get('/', refreshToken, (req, res) => {
	console.log('새로운 토큰 만들기 실행');

	res.send(createAccessJwt(req.user));
});

// 로그인
authRouter.post('/', async (req, res, next) => {
	console.log('authRouter.post 실행');
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		console.log('회원을 찾을 수 없습니다.');
		return res.status(400).json({ message: '계정이 존재하지 않습니다.' });
	}
	// 검색 한 유저의 비밀번호와 요청된 비밀번호의 해쉬값이 일치하는지 확인
	if (user.password !== hashPassword(password)) {
		console.log('비밀번호가 일치하지 않습니다.');
		return res.status(400).json({ message: '비밀번호가 틀렸습니다.' });
	}
	console.log('토큰 만들기 실행');
	res.send(setUserToken(user));
});

authRouter.use('/logout', logoutRouter);

//< -- 서버 받으면 구글 연동하기-->
//< -- 1. 구글 클라우드 플랫폼-> API 및 서비스 -> 사용자 인증 정보 들어가기 -->
//< -- 2.  미리 만들어놓은 OAuth 클라이언트 -> 승인된 리디렉션 URL에 도메인주소/api/auth/google/callbakc 입력 -->
//< -- 3. 로그인 실행 -->
//< -- 4. 로그아웃 실행 -->
authRouter.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	(req, res, next) => {
		setUserToken(res, req.user);
		res.redirect('/');
	}
);

module.exports = authRouter;
