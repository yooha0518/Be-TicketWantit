const hashPassword = require('../utils/hash-password');
const { User } = require('../models');

module.exports =
	('/',
	async (req, res) => {
		const { currentPassword, password } = req.body;
		const { shortId } = req.user;
		const userPassword = await User.findOne({ shortId }, 'password');
		if (userPassword.password !== hashPassword(currentPassword)) {
			return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
		}

		await User.updateOne(
			{ shortId },
			{
				password: hashPassword(password),
				isTempPassword: false,
			}
		);

		res.status(200).send('비밀번호 변경완료 로그인페이지로 랜더링해주세요');
	});
