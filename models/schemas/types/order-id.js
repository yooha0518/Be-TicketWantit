const { nanoid } = require("nanoid"); //고유한 문자열 생성 라이브러리
const dayjs = require("dayjs");
const orderDate = dayjs().format("YYYYMMDD");

const shortId = {
  type: String,
  default: () => {
    return orderDate + "-" + nanoid(8);
  },
  require: true,
  index: true,
};

module.exports = shortId;
