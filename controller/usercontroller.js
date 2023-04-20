const { userService } = require('../services');

const userController = {
<<<<<<< HEAD
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
      const { name, password, address, number } = req.body;
      const user = await userService.updateUser(shortId, {
        name,
        password,
        address,
        number,
      });
      res.json(user);
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
=======
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
			console.log(isAdmin);
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
			const { name, password, address, number } = req.body;
			const user = await userService.updateUser(shortId, {
				name,
				password,
				address,
				number,
			});
			res.json(user);
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
>>>>>>> d0bc6d8e38b3f1b9af9c68bbd429cb13ba71ed6b
};

module.exports = userController;
