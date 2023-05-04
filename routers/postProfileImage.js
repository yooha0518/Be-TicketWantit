const { Router } = require('express');
const postProfileImageRouter = Router();
const { User } = require('../models/index');

postProfileImageRouter.post('/', async (req, res) => {
	console.log('프로필사진 수정 시작');
	const { shortId } = req.user;
	const profileImage = `34.64.112.166/${req.file.filename}`;
	const result = await User.updateOne(
		{ shortId },
		{
			profileImage,
		}
	);
	res.send(result);
});

module.exports = postProfileImageRouter;
