const express = require('express')
const app = express();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');


const dotenv=require('dotenv');
dotenv.config()





const expenseroutes=require('./routes/expenseroutes');
const loginsignupRoutes=require('./routes/loginsignupRoutes');
const productRoutes=require('./routes/product');
const premiumFeatureRoutes=require('./routes/premiumFeature');
const resetPasswordRoutes=require('./routes/forgotpassword');


const Expense = require('./models/expenses');
const User=require('./models/user');
const Order=require('./models/orders');
const ForgotPassword=require('./models/forgotpassword');
const fs=require('fs');
const path=require('path')




app.use(cors());
app.use(bodyParser.json({ extended: false })); ////this is for handling forms
app.use(bodyParser.json());


app.use('/user',loginsignupRoutes);
app.use('/expense',expenseroutes);
app.use('/purchase',productRoutes);
app.use('/premium',premiumFeatureRoutes);
app.use('/password',resetPasswordRoutes);

app.use((req,res,next)=>{
    console.log('urlll',req.url);
    console.log('Updated req.url');
    res.sendFile(path.join(__dirname,`public/${req.url}`))
});



mongoose.connect(process.env.MONGODB_URL)
.then(result=>{
    app.listen(3000);
    console.log('connected!......');
})
.catch(err=>{
    console.log(err);
})














