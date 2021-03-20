const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const cart = require("../models/cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  //console.log('create-payemnt88888',req.body);
  //return;
  // later apply coupon
  // later calculate price

  const {couponApplied}=req.body;

  //find user
  const user=await User.findOne({email:req.user.email}).exec();

  //2 get user cart total
  const {cartTotal,totalAfterDiscount}=await Cart.findOne({orderdBy:user._id}).exec();

 // console.log("Cart Total Charged+++",cartTotal,'after-DISCOUTN4444',totalAfterDiscount);

 let finalAmount=0;
 if(couponApplied && totalAfterDiscount){
   finalAmount=totalAfterDiscount * 100;
 }else{
   finalAmount=cartTotal*100;
 }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable:finalAmount
  });
};
