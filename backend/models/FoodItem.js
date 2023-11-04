const mongoose=require('mongoose');

const fooditemschema=new mongoose.Schema({
    categoryname:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    
    img:{
        type:String,
    },
    options:[{types:String,price:Number}],
    description:{
        type:String,
        required:true,
    }
},{timestamps:true});

module.exports = mongoose.model('fooditem',fooditemschema);