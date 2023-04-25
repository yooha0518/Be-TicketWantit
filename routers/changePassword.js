const hashPassword = require('../utils/hash-password');
const { User } = require('../models');

module.exports =
	('/',
	async (req, res) => {
		console.log('changePassword 시작');
		const { currentPassword, password } = req.body;
		const user = await User.findOne({ shortId: req.user.shortId });
		if (user.password !== hashPassword(currentPassword)) {
			console.log(user.password);
			console.log(hashPassword(currentPassword));
			res.status(400);
			return;
		}

		await User.updateOne(
			{ shortId: user.shortId },
			{
				password: hashPassword(password),
				isTempPassword: false,
			}
		);

		res.status(200).send('비밀번호 변경완료 로그인페이지로 랜더링해주세요');
	});
