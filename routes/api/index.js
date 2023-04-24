const router=require('express').Router();
const thoughtroutes=require('./thoughtroutes')
const userroutes=require('./userroutes');
router.use('/thoughts',thoughtroutes);
router.use('/users',userroutes);
module.exports = router
