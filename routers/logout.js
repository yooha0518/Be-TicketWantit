const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
	console.log('로그아웃 라우터 테스트');
	res.send('로그아웃은 프론트에서 실행');
});

module.exports = router;
