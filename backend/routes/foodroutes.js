const express = require("express");
// const { usersignup } = require('../controlllers/usercontroller');
const router = express.Router();

const FoodItem=require('../models/FoodItem');
const FoodCategory = require("../models/FoodCategory");

router.post("/createfooditem", async (req, res) => {

    const {categoryname,name,img,options,description}=req.body;

   try{
     if(categoryname&&name&&img&&description){
            await FoodItem.create({
                categoryname:categoryname,
                name:name,
                img:img,
                options:options,
                description:description
            }).then(()=>{
                return res.status(200).json({
                    success:true    })
            })
    }
   }catch(err){
     console.log(err);
      res.json({ success: false });
   }


});
router.post("/createcategory", async (req, res) => {
  const {categoryname}=req.body;
   try{
     if(categoryname){
            await FoodCategory.create({
                categoryname:categoryname
            }).then(()=>{
                return res.status(200).json({
                    
                    success:true    })
            })
    }
   }catch(err){
     console.log(err);
      res.json({ success: false });
   }


});

////////GET////////////
// router.get('/getfoodcategories',async(req,res)=>{

//   try{
//     const foodcategories=await FoodCategory.find();
//     res.status(200).json(foodcategories);
//   }catch(err){
//     res.status.json({msg:err});
//   }

// })
// router.get('/getfooditems',async(req,res)=>{

//   try{
//     const foodItems=await FoodItem.find();
//     res.status(200).json(foodItems);
//   }catch(err){
//     res.status.json({msg:err});
//   }

// })

router.get('/fooddata',async(req,res)=>{

 try{
  const foodcategories=await FoodCategory.find();
  const foodItems=await FoodItem.find();
  res.status(200).json({foodcategories,foodItems});

 }catch(err){
  res.status(400).json({msg:err});
 }



});

module.exports = router;
