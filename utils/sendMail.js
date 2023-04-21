const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '518hayoung@gmail.com',
        pass: 'ihbnvmfjftvhzook',
    },
});


const userTo = '518hayoung@gmail.com';
module.exports = (to, subject, text) => new Promise((resolve, reject) => {
  const message = {
    from: userTo,
    to,
    subject,
    text,
  };
  
  transport.sendMail(message, (err, info) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(info);
  });
});