const { Router } = require('express');
const { userController } = require('../controller');
const userRouter = Router();

//사용자 추가
userRouter.post('/',userController.postUser);

//사용자 정보 조회
userRouter.get('/:shortId',userController.getUser)

//사용자 정보 수정
userRouter.put('/:id',userController.putUser);

//사용자 정보 삭제
userRouter.delete('/:id',userController.deleteUser);

module.exports = userRouter;
