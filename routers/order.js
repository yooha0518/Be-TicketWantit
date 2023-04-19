const {Router} = require('express');
const router = Router();
const Order = require('../models');

router.get('/',(req,res)=>{
    res.send('this is order');
})

module.exports = router;