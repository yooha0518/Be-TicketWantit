const jwt = require('jsonwebtoken');

const secret = 'yoohayoung';

exports.secret = secret;

exports.setUserToken = (res, user) => {
  const token = jwt.sign(user, secret); // 유저 jwt 토큰생성
  res.cookie('token', token); // 토큰을 쿠키로 전달
}