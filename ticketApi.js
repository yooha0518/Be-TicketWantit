
const axios = require('axios');

axios({
    method:"get",
    url:"http://api.kcisa.kr/API_CNV_053/request?serviceKey=a2fc0e3d-d664-4c91-b0f6-b6a8d427062b&numOfRows=100&pageNo=1",
}).then((res)=>{
    console.log(res.data.response.body.items);
})
