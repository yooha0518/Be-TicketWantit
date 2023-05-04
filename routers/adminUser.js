const { Router } = require('express');
const adminUserRouter = Router();
const { userController } = require('../controller/index');

//ADNIM 유저 전체 조회
adminUserRouter.get('/', userController.adminGetUserlist);

//ADNIM 유저 정보 수정
adminUserRouter.put('/:shortId', userController.adminUpdateUser);

//ADNIM 유저 정보 삭제
adminUserRouter.delete('/:shortId', userController.adminDeleteUser);


module.exports = adminUserRouter;
