const {Router} = require('express');
const router = Router();

router.get('/',(req,res)=>{
    res.send('this is order');
})

module.exports = router;