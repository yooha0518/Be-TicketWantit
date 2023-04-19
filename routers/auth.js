const { Router } = require('express');
const passport = require('passport');

const router = Router();

router.get('/', (req, res) => {
	res.send('api/auth  test');
});

// passport local 로 authenticate 하기
router.post('/', passport.authenticate('local'), (req, res, next) => {
	res.send(req.user);
	//res.redirect('/');
});

// router.get('/logout', (req, res) => {
// 	console.log('로그아웃 시도');
// 	// 세션 파괴
// 	req.logout();
// 	// 로그아웃 후 리다이렉트할 URL 지정
// 	res.send('로그아웃 되었습니다.');
// 	console.log('로그아웃 되었습니다.');
// });

router.get('/logout', (req, res) => {
	req.logout();
	req.session.save(function (err) {
		if (err) throw err;
		res.redirect('/');
	});
});
module.exports = router;
