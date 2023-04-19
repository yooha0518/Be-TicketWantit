const { Router } = require('express');
const passport = require('passport');
const router = Router();

router.post('/', passport.authenticate('local'), (req, res, next) => {
	console.log('로그인');
	res.json(req.session.user);
	//res.redirect('/');
});

router.get('/', (req, res) => {
	res.send('/api/login 페이지');
});

module.exports = router;
