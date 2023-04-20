const { Router } = require('express');
const passport = require('passport');
const { setUserToken } = require('../utils/jwt');

const router = Router();

router.get('/', (req, res) => {
	res.send('api/auth  test');
});

// passport local 로 authenticate 하기
router.post(
	'/',
	passport.authenticate('local', { session: false }),
	(req, res, next) => {
		console.log('토큰 만들기 실행');
		console.log('토큰 만들기 완료');
		setUserToken(res, req.user);
		console.log('req.user');
		res.send(req.user); //**수정사항** :성공하면 200 넘기기
	}
);

router.get('/logout', (req, res, next) => {
	res.cookie('token', null, {
		maxAge: 0,
	});
	res.send('로그아웃 되었습니다.');
});

module.exports = router;
