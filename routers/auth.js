const { Router } = require('express');
const passport = require('passport');
const { setUserToken } = require('../utils/createjwt');
const refreshToken = require('../middlewares/getUserFromRefreshJwt');
const authRouter = Router();
const { createAccessJwt } = require('../utils/createAccessJwt');
const { userController } = require('../controller');

//access토큰 발급
authRouter.get('/', refreshToken, (req, res) => {
	res.send(createAccessJwt(req.user));
});

// 로그인
authRouter.post('/', userController.authUser);

//< -- 구글 연동 -- >
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
