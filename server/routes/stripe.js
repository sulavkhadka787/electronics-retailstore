const express=require('express');
const router=express.Router();

const {createPaymentIntent}=require('../controllers/stripe');
const {route}=require('./user');

//midlleware
const {authCheck}=require('../middlewares/auth.js');

router.post('/create-payment-intent',authCheck,createPaymentIntent);

module.exports=router;