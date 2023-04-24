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
	async getUser(shortId) {
		console.log(`${shortId}:유저의 데이터를 조회합니다.`);
		const user = await User.findOne({ shortId });
		return user;
	},
	// 사용자 정보 수정
	async updateUser(shortId, { name, password }) {
		const result = await User.updateOne(
			{ shortId },
			{
				name,
				password: hashPassword(password),
			}
		);
		if (result.modifiedCount === 0) {
			console.log('shortID 값이 잘못되었습니다.');
		}
		return result; //성공여부, 조건에 맞는 문서의 수, 새로 생성된 문서의 수, 새로 생성된 문서의 id값이 들어있음
	},
	// 사용자 삭제 (회원탈퇴)
	async deleteUser(shortId) {
		const deletedUser = await User.deleteOne({ shortId });
		return deletedUser;
	},
};

module.exports = userService;
