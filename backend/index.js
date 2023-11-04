const express=require('express');
const dbconnect=require('./db');
const userroute = require('./routes/userroutes');
const foodroute=require('./routes/foodroutes');
const Orderoutes=require('./routes/Orderoutes');
const app=express();

const port=5000;

app.use((req, res,next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
})
app.use(express.json());

app.use('/api',userroute);
app.use('/api',foodroute);
app.use('/api',Orderoutes);

app.listen(port,()=>{
    dbconnect();
    console.log(`listening on port${port}`);
})
