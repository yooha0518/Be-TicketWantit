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
		const user = await User.findOne(
			{ shortId },
			{ isAdmin: 0, isTempPassword: 0, state: 0 }
		);
		return user;
	},
	async getUserpassword(shortId) {
		const user = await User.findOne({ shortId }, 'password');
		return user;
	},
	async getUserFromEmail(email) {
		const user = await User.findOne({ email });
		return user;
	},
	// 사용자 정보 수정
	async updateUser(shortId, { name, address, zipCode, phoneNumber }) {
		//성공여부, 조건에 맞는 문서의 수, 새로 생성된 문서의 수, 새로 생성된 문서의 id값이 들어있음
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
			console.log('변경사항이 없습니다.');
		}
		console.log(result);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	async updateProfileImage(shortId, profileImage) {
		const result = await User.updateOne(
			{ shortId },
			{
				profileImage,
			}
		);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	async updatePasswordFromEmail(email, tempPassword) {
		const result = await User.updateOne(
			{ email },
			{
				password: hashPassword(tempPassword),
				isTempPassword: true,
			}
		);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	async updatePasswordFromShortId(shortId, password) {
		const result = await User.updateOne(
			{ shortId },
			{
				password: hashPassword(password),
				isTempPassword: false,
			}
		);
		return {
			message: `요청: ${result.acknowledged}, 요청된 문서의 수: ${result.modifiedCount}`,
		};
	},
	// 사용자 삭제 (회원탈퇴)
	async deleteUser(shortId) {
		await User.updateOne({ shortId }, { $set: { state: false } });
		return { message: '계정이 탈퇴 되었습니다.' };
	},
	async realDeleteUser(shortId) {
		const deleteResult = await User.deleteOne({ shortId });
		console.log(deleteResult);
		return { message: '계정이 영구삭제 되었습니다.' };
	},

	//관리자 - 사용자 전체 정보 조회
	async adminReadUser(page) {
		const total = await User.countDocuments({});
		const userlist = await User.find({})
			.sort({ name: 1 })
			.skip(7 * (page - 1))
			.limit(7);

		console.log([userlist, { total: total }]);
		return [userlist, { total: total }];
	},
};

module.exports = userService;
