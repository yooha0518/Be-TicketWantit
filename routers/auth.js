const { Router } = require('express');
const passport = require('passport');
const { setUserToken } = require('../utils/jwt');

const router = Router();

router.get('/', (req, res) => {
	res.status(200).send('api/auth  test');
});

// passport local 로 authenticate 하기
router.post(
	'/',
	passport.authenticate('local', { session: false }),
	(req, res, next) => {
		console.log('토큰 만들기 실행');
		setUserToken(res, req.user);
		console.log('토큰 만들기 완료');
		console.log('req.user');
		res.status(200).send(req.user); //**수정사항** :성공하면 200 넘기기
	}
);

router.get('/logout', (req, res, next) => {
	res.cookie('token', null, {
		maxAge: 0,
	});
	res.status(200).send('로그아웃 되었습니다.');
});

//< -- 서버 받으면 구글 연동하기-->
//< -- 1. 구글 클라우드 플랫폼-> API 및 서비스 -> 사용자 인증 정보 들어가기 -->
//< -- 2.  미리 만들어놓은 OAuth 클라이언트 -> 승인된 리디렉션 URL에 도메인주소/api/auth/google/callbakc 입력 -->
//< -- 3. 로그인 실행 -->
//< -- 4. 로그아웃 실행 -->
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	(req, res, next) => {
		setUserToken(res, req.user);
		res.redirect('/');
	}
);

module.exports = router;
