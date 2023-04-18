const { User } = require('../models');
const hashPassword = require('../utils/hash-password');

const userService = {
	// 사용자 생성 (회원가입)
	async createUser({ email, password, name }) {
		const hashedPassword = hashPassword(password); // 비밀번호 해쉬값 만들기
		const createdUser = await User.create({
			email,
			password: hashedPassword,
			name,
		});
		return createdUser;
	},
	// 사용자 정보 조회
	async getUser(id) {
		const user = await User.findOne(id);
		return user;
	},
	// 사용자 정보 수정
	async updateUser(id, { name, password, address, number }) {
		const updatedUser = await User.updateOne(id, {
			name,
			password,
			address,
			number,
		});
		return updatedUser;
	},
	// 사용자 삭제 (회원탈퇴)
	async deleteUser(id) {
		const deletedUser = await User.deleteOne(id);
		return deletedUser;
	},
};

module.exports = userService;
