const User=require('../models/user');
const Cart=require('../models/cart');
const Product=require('../models/product');
const Coupon=require('../models/coupon');
const stripe=require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent=async(req,res)=>{
    //
}