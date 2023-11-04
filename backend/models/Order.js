const mongoose=require('mongoose');

const orderschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    orderdata:{
        type:Array,
        required:true
    }
});


module.exports=mongoose.model("orders",orderschema);