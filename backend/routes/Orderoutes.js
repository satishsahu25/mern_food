const express = require("express");
const router = express.Router();
const Order=require('../models/Order');

router.post("/orderdata", async (req, res) => {

    const {orderdata}=req.body;

    await orderdata.splice(0,0,{orderdate:req.body.orderdate});
    
    // console.log(orderdata);
    //if email exist
    let eid=await Order.findOne({email:req.body.email});
   if(eid===null){
    try{
        //first time creating order of that user
        await Order.create({
            email:req.body.email,
            orderdata:[orderdata]
        }).then(()=>{
            res.status(200).json({success:true});
        })
    }
   catch(err){
     res.status(400).json(err);
   
   }}else{
    try{
        //if user already had order then just push into its account
        await Order.findOneAndUpdate({email:req.body.email},
            {$push:{orderdata:orderdata}}).then(()=>{
                res.status(200).json({success:true});
            })
    }catch(err){
        res.status(400).json({"Server error":err.message});
    }
   }
});

router.post("/myorderdata", async (req, res) => {
    const {email}=req.body;

    try{
        let mydata=await Order.findOne({email:email});
        res.status(200).json({orderdata:mydata});
    }catch(err){
        res.status(400).json(err);
    }

   
    
  
});

module.exports = router;
