const { userService } = require('../services');

const userController = {
	async postUser(req, res, next) {
		try {
			const { email, password, name } = req.body;
			// 추출한 데이터를 userService.createUser로 전달
			const user = await userService.createUser({ email, password, name });
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
	async getUser(req, res, next) {
		try {
			const shortId = req.user.shortId;
			const isAdmin = req.user.isAdmin;
			console.log(`관리자: ${isAdmin}`);
			const user = await userService.getUser(shortId);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
	async putUser(req, res, next) {
		try {
			const shortId = req.user.shortId;
			console.log(shortId);
			const { name, password } = req.body;
			const result = await userService.updateUser(shortId, {
				name,
				password,
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
};

module.exports = userController;
