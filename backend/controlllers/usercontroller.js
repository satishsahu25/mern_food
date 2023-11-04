
const { body, validationResult } = require('express-validator');

const usersignup=async(req,res)=>{

    const {name,location,email,password}=req.body;
    try{

       

        await User.create({
            name:name,
            password:password,
            location:location,
            email:email
        });

        res.json({
            success: true,
        })

    }catch(err){
        console.log(err);
        res.json({success: false});
    }
}

module.exports={usersignup}