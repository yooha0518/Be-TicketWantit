const { nanoid } = require('nanoid'); //고유한 문자열 생성 라이브러리

const shortId = {
    type: String,
    default: () => {
        return nanoid(8);
    },
    require: true,
    index: true,
};

module.exports = shortId;