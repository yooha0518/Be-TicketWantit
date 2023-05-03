const { userService } = require('../services');

const userController = {
	async postUser(req, res, next) {
		try {
			console.log('회원가입(postUser) 시작');
			const { email, password, name } = req.body;
			const alreadyUser = await userService.getUserEmail(email);
			if (alreadyUser) {
				return res
					.status(400)
					.json({ message: '계정이 이미 가입되어있습니다.' });
			}
			// 추출한 데이터를 userService.createUser로 전달
			const user = await userService.createUser({
				email,
				password,
				name,
			});
			req.user = user;
			next();
		} catch (error) {
			return res
				.status(400)
				.json({ message: '회원가입에 실패했습니다 다시 시도해주세요.' });
		}
	},
	async getUser(req, res, next) {
		try {
			console.log('getUser 실행');
			const { shortId } = req.user;
			const user = await userService.getUser(shortId);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
	async putUser(req, res, next) {
		try {
			const shortId = req.user.shortId;
			const { name, address, zipCode, phoneNumber } = req.body;
			const result = await userService.updateUser(shortId, {
				name,
				address,
				zipCode,
				phoneNumber,
			});
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	},
	async deleteUser(req, res, next) {
		try {
			const shortId = req.user.shortId;
			const user = await userService.deleteUser(shortId);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
	async authUser(req, res, next) {
		try {
			const { email } = req.body;
			const user = await userService.getUserEmail(email);
			res.json(user);
		} catch (errer) {
			next(error);
		}
	},
};

module.exports = userController;
