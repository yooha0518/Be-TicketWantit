const {Router} = require('express');
const {userController} = require('../')
const router = Router();

//사용자 추가
router.post('/',async(req,res)=>{ 
    userController.createUser


});