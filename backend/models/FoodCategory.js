const mongoose=require('mongoose');

const foodcategoryschema=new mongoose.Schema({
    categoryname:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true});


module.exports = mongoose.model('foodcategory',foodcategoryschema);