const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);
const MONGOURL=process.env.MONGOURL;
const dbconnect = async() => {
  try {
    await mongoose.connect(MONGOURL);
    console.log("Mongo connected");
    
  } catch (err) {
    // throw new Error(err);
    console.log("Mongo error", err);
  }
};

module.exports = dbconnect;