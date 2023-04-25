const { userService } = require('../services');

const userController = {
	async postUser(req, res, next) {
		try {
			console.log('회원가입(postUser) 시작');
			const { email, password, name } = req.body;
			// 추출한 데이터를 userService.createUser로 전달
			const user = await userService.createUser({ email, password, name });
			//console.log(user);
			req.user = user;
			next();
		} catch (error) {
			next(error);
		}
	},
	async getUser(req, res, next) {
		try {
			console.log('getUser 실행');
			const { shortId, isAdmin, isTempPassword } = req.user;
			console.log(`관리자: ${isAdmin}`);
			console.log(`임시비밀번호: ${isTempPassword}`);
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
			const { name } = req.body;
			const result = await userService.updateUser(shortId, {
				name,
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
