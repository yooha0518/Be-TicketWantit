const fs = require('fs');
const { User } = require('../models');
const hashPassword = require('../utils/hash-password');

const userService = {
	// 사용자 생성 (회원가입)
	async createUser({ email, password, name }) {
		console.log('createUser 시작');
		const user = await User.findOne({ email });
		if (user) {
			console.log('------------------');
			//이미 가입된 이메일인 경우
			//return res.status(400).json({ message: '계정이 이미 가입되어있습니다.' });
			const err = new Error('계정이 이미 가입되어있습니다.');
			err.status = 400;
			throw err;
		} else {
			const hashedPassword = hashPassword(password); // 비밀번호 해쉬값 만들기
			const createdUser = await User.create({
				email,
				password: hashedPassword,
				name,
			});
			return createdUser;
		}
	},
	// 사용자 정보 조회
	async getUser(shortId) {
		console.log(`${shortId}:유저의 데이터를 조회합니다.`);
		const user = await User.findOne({ shortId });
		return user;
	},
	async getUserEmail(email) {
		console.log(`email이 ${email}인 유저의 데이터를 조회합니다.`);
		const user = await User.findOne({ email });
		return user;
	},
	// 사용자 정보 수정
	async updateUser(shortId, { name, address, zipCode, phoneNumber }) {
		const result = await User.updateOne(
			{ shortId },
			{
				name,
				address,
				zipCode,
				phoneNumber,
			}
		);
		if (result.modifiedCount === 0) {
			console.log('shortID 값이 잘못되었습니다.');
		}
		return result; //성공여부, 조건에 맞는 문서의 수, 새로 생성된 문서의 수, 새로 생성된 문서의 id값이 들어있음
	},
	// 사용자 삭제 (회원탈퇴)
	async deleteUser(shortId) {
		const user = await User.findOne({ shortId });
		const profileImagePath = user.profileImage;
		fs.unlink(profileImagePath, (err) => {
			if (err) throw err;
			console.log('탈퇴한 유저의 프로필사진이 삭제되었습니다.');
		});
		const deletedUser = await User.deleteOne({ shortId });
		return deletedUser;
	},
};

module.exports = userService;
