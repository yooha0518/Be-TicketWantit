const { Router } = require('express');
const { userController } = require('../controller');
const userRouter = Router();


//사용자 추가
userRouter.post('/', userController.postUser);

//사용자 정보 조회
userRouter.get('/', userController.getUser);

//사용자 정보 수정
userRouter.put('/', userController.putUser);

//사용자 정보 삭제
userRouter.delete('/', userController.deleteUser);

module.exports = userRouter;
