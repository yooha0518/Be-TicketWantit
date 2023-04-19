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
      const { shortId } = req.params;
      console.log('hello');
      const user = await userService.getUser(shortId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async putUser(req, res, next) {
    try {
      const { shortId } = req.params;
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
      const { shortId } = req.params;
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
>>>>>>> 9c81ae9f57c3560f78399a085a28b9464cd8c454
};

module.exports = userController;
