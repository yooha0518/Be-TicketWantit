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

module.exports = router;
